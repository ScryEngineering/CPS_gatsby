---
title: "Associative mappings in language design"
author: "Janis Lesinskis"
date: "2018-04-23"
tags:
    - javascript
    - ES6
    - Python
    - API-design
    - programming-languages
contentType: "blog"
---

We have been working on projects in Javascript and Python a fair bit lately. In the past we ported a few legacy PHP apps over to newer systems. A thought that has been in my mind for a while has been that the associative mapping types in languages work much better if they are completely distinct from sequence types.

It took something from today to finally prompt me to write about it though.

## Why `.length` doesn't always work for finding the count of the elements

We were filtering some data and wanted to get a count of how elements there were in the Array. A really simple way to go about this would be to use the `length` property:

```javascript
const test = [1,2,3];
console.log(test.length);
```

So far so good, we have a result of 3 here.
But what about this:

```javascript
let test = [1,2,3];
test[10] = 4;
console.log(test.length);
```

We get a result of 11!

Now if this is ["astonishing"](https://en.wikipedia.org/wiki/Principle_of_least_astonishment) to you then it is because you'd expect something else here (I expected to see an index error of some sort here).

From [the standard](https://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-array-instances-length) the length is defined as:
> The length property of an Array instance is a data property whose value is always numerically greater than the name of every configurable own property whose name is an array index.

So this isn't really based on the contents of the array but is rather a gaurantee of a number that is always bigger than the index of the last element.
Ultimately javascript has not clearly differentiated between sequences and associative mappings here.

```javascript
let test = [1,2,3];
test[10] = 4;
console.log(test.length);
```

Going to the developer console shows that the array `test` is now this:

```javascript
[ 1, 2, 3, null, null, null, null, null, null, null, 4]
```

The implementation appears to be a dense representation that has padded intermediate values with `null`s.

## Our solution

There's probably a library for this [somewhere on NPM](https://www.npmjs.com/package/array-length) (there's a NPM library for *everything*!) but we didn't want to introduce a dependency for something this simple and just used this ES6 snippet:

```javascript
const count = test.filter(() => true).length;
```

And now we get the expected results! Go play around with this over on https://es6console.com/ or https://jsfiddle.net/ or something.

## What you can learn from this when making your own APIs

I feel like there's a learning opportunity here, this post isn't meant to be a "lets all bash on xyz language" post, there's plenty of [those out there already](https://www.destroyallsoftware.com/talks/wat).
Rather I think that seeing exactly why this is clunky can help us make better APIs.

Overall the newer javascript language standards present a modern usable language but there's definitely some conceptual overhead if you want to understand how things are implemented at a deeper level, especially the cruft from the early pre-standardized language that's had to stay around.
Comparing with a language that has a better type system that is also highly dynamic is quite enlightening. Python's type system is better in this situation as it very clearly separates the notions of associative mappings and sequences.
There's the `dictionary` type which is an associative mapping only and the `list` type is a sequence.
Specifically you the interface to the associative mappings and the sequences are distincy, you can't accidentally use one on the other.

```python
>>> test = [1,2,3]
>>> test[10] = 4
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
IndexError: list assignment index out of range
```

Because the indexes are not dictionary keys in Python this straight up fails, you have to supply a valid index into the array.

If you wish to check how many items are in a collection you just use the standard library `len` function and it will give you the number of items contained.
This works the same way for all standard library containers.

```python
>>> test = [1,2,3]
>>> len(test)
3
```

This is fairly simple although it's implemented via a function and not a method (the `len` function forwards a call to the special "dunder" method `__len__` of the argument given to it).

Note that there's no way in which you can modify the length of a python `list` without changing the elements contained within it.

```python
>>> test.__len__ = 4
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'list' object attribute '__len__' is read-only
```

Honestly this is a really good thing, as very little good could come out of changing this.

In Javascript however you can do this:

```javascript
let test = [1,2,3,4,5]
test.length = 3
console.log(test)
```

Now test is `[1,2,3]` as changing the `length` truncates the Array. Honestly this strikes me as a really bad API for trunctation because it forces you to think about implementation details. This maybe can start to make conceptual sense if you think of things in terms of the array having an implementation that has contiguous layout of elements, but then at the same time the rest of the API doesn't really follow these same conventions because it lets you interact with an associative mapping-like index. The fact that you need to start thinking about implementation details for the behavior to make sense is not ideal. The interface having multiple different paradigms at once is a pretty big red flag, if that happens in any API you are designing it's a good hint to take a break to think about improving it or asking someone else what they think.

There's other pain points with these Arrays as well, take for example:

```javascript
let test = [1,2,3,4,5]
test['foo'] = 'bar' //length still 5
test['10'] = 10 //length now 11
```

So in this case `test['foo']` adds in a property to the `test` object but `test['10']` treats the string as an index.
This is because in JavaScript array indexes are always coerced to strings by an implicit `toString()` call and `'10'` will end up being `'10'` again after `toString()` is called on it hence why it behaves like the integer `10`.

[From MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array):
> Array elements are object properties in the same way that toString is a property, but trying to access an element of an array as follows throws a syntax error because the property name is not valid

This is a definite type system shortcoming as `'foo'` and `'10'` have the same type but invoke completely different behavior. This is an issue because you once again have to think about implementation details to understand the behavior you see. This might be the single biggest practical reason I can see that implicit type coercion is bad is that it substantially increases the mental overhead required to understand what's happening in the code. Once you follow through the implementation logic you see that `test[10]` gets transformed to `test['10']` behind the scenes then things start to make some sense, but it comes at a cost of increased mental overhead. Just to be clear this type conversion issue isn't Javascript specific, [c++ has some complex conversion rules too](http://en.cppreference.com/w/cpp/language/implicit_conversion) the result being that it takes a lot of mental effort to understand exactly what's going on in some cases. What is a Javascript specific problem is that very frequent operations in the langauge have hard to understand semantics, this is unfortunate.

Note that in Python there's no gaurantee of contiguity in memory for a `list` type, the list type can (and does in CPython) store references to elements that are all over the place in memory (sometimes even [elements that are self-references to the same list](/tutorial/2018-04-22/Python-self-references/)). But the real point is that you *rarely* need to care about the implementation details in order to use it effectively. The same can be said for all the basic data types provided by that language. If for some reason (like a profiled performance bottleneck) you *do* need to care about implementation you explicitly use a module that will provide the implementation you need (such as [Array.Array](https://docs.python.org/3/library/array.html) in the standard library).

Overall if you want to make a good API make the users of your API need to know the minimum amount possible about the underlying implementation details.
