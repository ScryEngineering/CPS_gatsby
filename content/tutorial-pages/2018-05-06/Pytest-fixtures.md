---
title: "Pytest fixtures"
author: "Janis Lesinskis"
date: "2018-05-06"
tags:
    - Python
    - OpenAPI
    - REST
    - Flask
    - testing
draft: true
contentType: "tutorial"
---

Recently I have been working on the Web API for Persephone.

Part of this has involved writing an API which is powered by OpenAPI and Flask. This makes good use of the connexion library for providing an OpenAPI powered API.

So I came across a situation where there was a bug and I wanted to write a couple of regression tests. I had some API tests saved in Postman but since those were local to my machine and just didn't seem like they would convey as much value to other contributors as a test case that could be run via CI, especially one that was integrated with the GitHub pull-requests workflow. (If there's some way of using the tests from Postman in a CI setup that would be really good to know about, please email us!)

In this tutorial I'll run you through the thought process I have when I was putting together this PR: https://github.com/persephone-tools/persephone-web-API/pull/12

In the spirit of getting something working first before refactoring I put together a very basic test case for an endpoint:

```python
import os

import connexion
from connexion.resolver import RestyResolver
import pytest

import api

flask_app = connexion.FlaskApp(__name__)
flask_app.add_api('../swagger/api_spec.yaml', resolver=RestyResolver('api'))


@pytest.fixture(scope='module')
def client():
    with flask_app.app.test_client() as c:
        yield c

def test_backend(client):
    """Test information about the transcriber library on the backend is provided"""
    response = client.get('/v0.1/backend')
    assert response.status_code == 200
```

So far so good. Test runs and works. (note that we have to use `flask_app.app` to access the underlying Flask application because connexion wraps that up)

So I make another test for the file upload capabilities like so:

```python
def test_audio_uploads_endpoint(client):
    """Test audio upload endpoint works"""
    import io
    WAV_MAGIC_BYTES = b'RIFF....WAVE'
    data = {'audioFile': (io.BytesIO(WAV_MAGIC_BYTES), 'test_wav_file.wav')}
    response = client.post(
        ('/v0.1/audio'),
        data=data,
        content_type='multipart/form-data'
    )
    assert response.status_code == 201
```

This test fails and 500 errors, so I turn on the debug mode via the flask configuration by adding the following to the client fixture setup:

```python
app = connexion.FlaskApp(__name__)
app.add_api('../swagger/api_spec.yaml', resolver=RestyResolver('api'))

@pytest.fixture(scope='module')
def client():
    # fetch underlying flask app from the connexion app
    flask_app = app.app
    flask_app.config['DEBUG'] = True
    flask_app.config['TESTING'] = True
    with flask_app.test_client() as c:
        yield c
```

So now when this fails I at least get a message as to why as opposed to just getting the non-descript 500 response that I would like to see if I were actually running this in production.

One test working while the other doesn't comes down to configuration not being set up properly for the file uploads. Generally you want to make sure that if you are doing an integration type of test that you are actually testing the same thing which means that the configuration must be the same. So I set up the required configuration which closely mirrors the actual app config:

```python
@pytest.fixture(scope='module')
def client():
    # !!! duplication of config begins here !!!
    # fetch underlying flask app from the connexion app
    flask_app = app.app

    # configure the DB
    # in-memory sqlite DB for development purposes, will need file backing for persistence
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    from api import db
    db.init_app(flask_app)

    # create DB tables
    with flask_app.app_context():
        db.create_all()

    # configure upload paths
    flask_app.config['MAX_CONTENT_LENGTH'] = 64 * 1024 * 1024 #max 64 MB file upload
    flask_app.config['BASE_UPLOAD_DIRECTORY'] = os.path.join(os.getcwd(), 'test_uploads')
    configure_uploads(flask_app)
    # !!! duplication of config ends here !!!

    flask_app.config['DEBUG'] = True
    flask_app.config['TESTING'] = True
    with flask_app.test_client() as c:
        yield c
```

Now eveything works well, the test no longer errors. The test itself is fairly simple here but the fixture to set up the test client needed a lot of additional work. There's 2 issues that become immediately apparent here:

1. A lot of code is getting duplicated per file to set up the fixtures.
2. A lot of the configuration is duplicated with the main app itself.

So I went about fixing these issues in this PR.

# Using pytest fixtures with Flask

In order to deal with this duplication of the test fixtures we can make use of Pytest's test fixtures. Specifically Pytest provides the ability to specify a fixture to multiple test files via conftest.

So we set up a file `tests/conftest.py` in which we can set up fixtures that will be available to all the tests we wish to run.

If we just copied the existing setup directly it won't work immediately as we are running a few things that must be run only once more than once now:

```
E           AssertionError: A setup function was called after the first request was handled.  This usually indicates a bug in the application where a module was not imported and decorators or other functionality was called too late.
E           To fix this make sure to import all your view modules, database models and everything related at a central place before the application starts serving requests.
```

So we have to make sure that these functions that create DB tables are called only once. To do this we can make good use of the fact that Python modules are effectively singletons and we can place the relevant configuration at the top level of conftest.py:

```python
# conftest.py

#Set up flask_app here

@pytest.fixture
def client():
    """Create a test client to send requests to"""
    with flask_app.test_client() as c:
        yield c
```

So at this point we have now created a fixture and removed the duplicated code to set up the test server.