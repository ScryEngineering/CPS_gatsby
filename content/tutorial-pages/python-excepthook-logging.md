---
title: "Logging uncaught exceptions in Python applications"
date: "2018-02-06"
tags:
    - programming
    - Python
    - logging
---


A common situation is that you want to be able to get good logging data from your applications to be able to reduce the amount of time that you require in order to fix issues and debug problems. The logging package in the standard library is very good for general purpose logging, this lets you put in code that will write to the logs.

Example code for this tutorial can be found on our GitHub page: [https://github.com/customprogrammingsolutions/excepthook\_logging\_example](https://github.com/customprogrammingsolutions/excepthook_logging_example)

However one situation that you very likely want to cover is when an unhandled exception occurs in the program. You might think of executing everything in a try-catch but that's a bit bad for a few reasons, you may not want to have the exception caught, such as a `KeyboardInterrupt` when people are running your code from the REPL.

For example you could modify your code to run it in a big exception block by doing something like:

```python
import sys

try:
    # all your code that gets executed here
except:
    print("Unhandled exception:", sys.exc_info()[0])
    raise
```

A better approach that doesn't require modifying existing code is to make use of the [sys module](https://docs.python.org/3/library/sys.html) which provides [excepthook](https://docs.python.org/3/library/sys.html#sys.excepthook) to allow you to attach a handler for any unhandled exception.

```python
import sys
import logging

logger = logging.getLogger(__name__)
logging.basicConfig(filename='example.log', filemode='w', level=logging.DEBUG)

def handle_unhandled_exception(exc_type, exc_value, exc_traceback):
    """Handler for unhandled exceptions that will write to the logs"""
    if issubclass(exc_type, KeyboardInterrupt):
        # call the default excepthook saved at __excepthook__
        sys.__excepthook__(exc_type, exc_value, exc_traceback)
        return
    logger.critical("Unhandled exception", exc_info=(exc_type, exc_value, exc_traceback))

sys.excepthook = handle_unhandled_exception
```

This is something we can use with logging to make sure any unhandled exception will end up in our log files without us having to modify the source of other modules. Unfortunately this won't work well with threading or multiprocessing without a few modifications that we will explain shortly:

```python
Exception in thread Thread-1:
Traceback (most recent call last):
  File "/usr/lib/python3.5/threading.py", line 914, in _bootstrap_inner
    self.run()
  File "/usr/lib/python3.5/threading.py", line 862, in run
    self._target(*self._args, **self._kwargs)
  File "/home/janis/python_examples/excepthook_logging_example/threaded_exception.py", line 9, in run
    raise ExceptionFromThread(self.error_message)
threaded_exception.ExceptionFromThread: Runs on thread
```

We get this console output without anything being written to the logs. This clearly isn't what we want with a global exception handler and there's a bug report about it here: https://bugs.python.org/issue1230540. The reason this happens is because because both threading and multiprocessing have their own unhandled exception machinery that is a bit customized. An unhandled exception on a thread gets handled by the threading code so no unhandled exception exists at the top level so `sys.exechook` never gets a chance to be called, it's the same machinery that will print out what thread the exception occurs on (the "Exception in thread Thread-1:" bit). We can patch this however like follows:

```python
def patch_threading_excepthook():
    """Installs our exception handler into the threading modules Thread object
    Inspired by https://bugs.python.org/issue1230540
    """
    old_init = threading.Thread.__init__
    def new_init(self, *args, **kwargs):
        old_init(self, *args, **kwargs)
        old_run = self.run
        def run_with_our_excepthook(*args, **kwargs):
            try:
                old_run(*args, **kwargs)
            except (KeyboardInterrupt, SystemExit):
                raise
            except:
                sys.excepthook(*sys.exc_info())
        self.run = run_with_our_excepthook
    threading.Thread.__init__ = new_init

patch_threading_excepthook()
```

If maintaining the threading information matters we can modify our excepthook caller in the patch code to be as follows:

```python
sys.excepthook(*sys.exc_info(), thread_identifier=threading.get_ident())
```

This assumes a slight modification to our excepthook handler to take a default argument that will handle the threading identifier passed into it.

Now that we have done this the excepthook approach for logging unhandled exceptions works great, we can't get this to work with the naive approach though as the exception that occurs on the other thread cannot be logged in the main thread of execution.

So that's it, you should be able to log all unhandled exceptions now with your function specified in `sys.excepthook` even if they are running in other threads (unless code similar to what Thread does handles it before you get a chance to first).