---
title: "API first design with OpenAPI"
author: "Janis Lesinskis"
date: "2018-04-24"
tags:
    - Python
    - OpenAPI
    - REST
draft: true
contentType: "tutorial"
---

API first design with OpenAPI

In this tutorial we will show you how you can go about API first design using Open API.

<!-- end excerpt -->

Lately we have been working on the Persephone projects web API, given that this is an open source library we can use this both as an inspiration and an example for this tutorial.

We will go through how you can design a solid REST API for a project.

We are going to use Python for this as that's what we are currently using in a project, but the tooling will exist in other languages as well.

# Tooling

Good tooling makes API design so much easier.

Go check out [Postman](https://www.getpostman.com/), having something like this will make your like a lot easier.
You can create the API calls you want and save them for future usage, the amount of time this has saved us is enormous.

TODO: insert screenshot

There's other tools out there as well, so go have a look around for something you like, it will be worth your time to do this if you do web API related work.

One of the main reasons OpenAPI is good is because there's a API explorer in many of the tools that makes it much easier to see what your API does.

This reduces friction for people wanting to explore what you have. All the API endpoints are nicely rendered in the provided web app and there's a good interface to test out various queries.

There's definitely a lot of overlap in the usefulness of the swagger tool and postman when it comes to submitting basic requests. It's when things are more complex that Postman starts to really show it's value, for simple request testing the swagger ui is far better than nothing. But if you were doing a lot of API work then a more specialized tool such as Postman that allows you to save compelx queries will become increasingly more valuable.


TODO: insert screenshot


# Getting started

Set up your VCS repo

Set up virtualenvironment