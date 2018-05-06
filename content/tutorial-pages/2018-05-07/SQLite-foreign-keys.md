---
title: "API first design with OpenAPI"
author: "Janis Lesinskis"
date: "2018-05-07"
tags:
    - Python
    - SQLite
    - SQLAlchemy
    - SQL
    - Flask
draft: true
contentType: "tutorial"
---

So I ran into a slightly preplexing issue when testing the Persephone web API.

Specifically I have some tables that have a foreign key relationship between them, no big deal I thought so I wrote some definitions as follows:

```python
class Utterance(db.Model):
    """Database ORM definiton for Utterances.
    This consists of a relationship between an Audio file and a transcription file
    """
    __tablename__ = 'utterance'

    id = db.Column(db.Integer, primary_key=True)

    audio_id = db.Column(
        db.Integer,
        db.ForeignKey('audio.id'),
        nullable=False,
    )   
    audio = db.relationship('Audio', backref='utterances')

    transcription_id = db.Column(
        db.Integer,
        db.ForeignKey('transcription.id'),
        nullable=False,
    )
    transcription = db.relationship('Transcription', backref='utterances')

    def __repr__(self):
        return "<Utterance(audio={}, transcription={})>".format(self.audio, self.transcription)

```

Which is then called like this:

```python
    current_utterance = Utterance(audio_id=audioId, transcription_id=transcriptionId)
    db.session.add(current_utterance)
    db.session.commit()
```

Now given bogus ID's this should just fail. But it didn't!

Because I wrote a test case for these bogus values I saw something was wrong immediately but I didn't know why. After a diversion into the SQL alchemy docs for foreign keys to see if I'd done something stupid I hadn't spotted anything.

So I look at the config and I'm using SQLite for the tests.
Looking into this further it turns out that SQLite doesn't actually enforce FK constraints by default.

This is because SQLite only started supporting foreign keys in version 3.6.19, [see their page for details](https://www.sqlite.org/foreignkeys.html). So this means that for backwards compatibility reasons you have to turn that functionality on explicitly. This means we need to issue the following command:

```sh
sqlite> PRAGMA foreign_keys = ON;
```

To do this using SQLALchemy we have to use the following hook:

```python
from sqlalchemy import event
from sqlalchemy.engine import Engine
from sqlite3 import Connection as SQLite3Connection

@event.listens_for(Engine, "connect")
def _set_sqlite_pragma(dbapi_connection, connection_record):
    if isinstance(dbapi_connection, SQLite3Connection):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON;")
        cursor.close()
```