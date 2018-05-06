---
title: "Enforcing foreign key contrains with SQLite"
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

Now given bogus IDs for foreign keys this should just fail. But it didn't! So I knew this was wrong and immediately wrote a failing test case to cover this behavior.
After a diversion into the SQL alchemy docs for foreign keys to see if I'd done something stupid in my ORM definitions I hadn't spotted anything.

I'm using SQLite for the tests and I remember that SQL implementations can differ so I look it up.
Looking into this further it turns out that SQLite doesn't actually enforce FK constraints by default. This default behavior took me entirely by surprise.

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

(From https://stackoverflow.com/questions/2614984/sqlite-sqlalchemy-how-to-enforce-foreign-keys)

Now we get this:

```sh
    def do_execute(self, cursor, statement, parameters, context=None):
>       cursor.execute(statement, parameters)
E       sqlalchemy.exc.IntegrityError: (sqlite3.IntegrityError) FOREIGN KEY constraint failed [SQL: 'INSERT INTO utterance (audio_id, transcription_id) VALUES (?, ?)'] [parameters: (99999, 99999)] (Background on this error at: http://sqlalche.me/e/gkpj)
```

Success!

Moral of the story, SQL implementations vary and these variations can be significant.