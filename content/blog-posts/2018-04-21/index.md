---
title: "Site relaunch"
date: "2018-02-06"
tags:
    - gatsby
    - drupal
    - CMS
    - web-development
contentType: "blog"
---

We have re-launched the site with a new technology, Gatsby.js.

We did this for a few reasons, most notably that we are actively searching for alternaitves to WordPress for clients and unfortunately had a bunch of issues with regards to the old Drupal powered site.

So instead of just taking another off the shelf CMS we decided to roll our own site using GatsbyJS.
This made a lot of sense for us because it allows us to do basically whatever we want, we have a significant amount of development skill in house so having a developer-oriented web framework wasn't an issue.

Doing re-writes is an expensive endeavour, and our general guideline is that you need really good reasons to do a re-write. So here's the reasoning behind our choice.

This [JAM stack](https://jamstack.org/) approach isn't for everyone though, if you aren't comfortable with ReactJS, markdown files and version control it would be difficult to go this route.


# Business benefits
One of the big reasons we decided to move our site platform over to GatsbyJS has to do with what it enables us to do with clients.
Specifically having the ability to create front-end products in react that can pull the data from other sources is massively powerful.

A large part of the cost of a WordPress site come in the form of the maintanence burden of updates, plugins that break and security work that is needed to mitigate the risks of the deployment.

Even when you are mostly on top of these things you can still get your site compromised, I know of sites that have kept up with updates and still got cracked, this is unfortunate. Having your site defaced or the data of your clients leaked definitely comes with a cost.

Some of the people we know in the industry really jump through hoops to enable people to use WordPress, 

## Cheaper hosting
Because you don't need a database to back things it's way cheaper to host the site this way, the only requirement now is a working Nginx or Apache instance. There's a lot of cost benefits of this site architecture.

You can also put the files on a (Content Delivery Network) CDN and then avoid the costs of running your own loadbalancers.

With a global CDN this will have the nice benefit of speeding up your page load times and making your site less vulnerable to denial of service attacks.

## Creating a reusable library of code for ALL of our web
This framework has really good interoperability with various existing Content Management Systems. By having a known set of real-world tested code we can rely on we are getting more comfortable offering alternatives to WordPress hosting.

The total cost of ownership with WordPress was always a concern to us, especially if support contracts were involved. For simple brochure type sites the costs of maintenance for WordPress are unfortunately very high without actually getting much value in return for the WordPress ecosystem.
By using a system with fewer moving parts that has fewer security and deployment concerns we feel much more confident that the client sites will function properly and support costs will not blow out.

# Technical benefits
The technical benefits for us with this approach are really substantial.

## Can use existing React components
There's a lot of React components out there and being able to reuse them is a really big win.

Related to this we can now reuse the components we made for this site which will make it quicker to create other client sites.

## No database to maintain
Our database crashed a few times, which meant that there was some site downtime, something we would very much rather avoid.

Seeing as we don't need to have a database at all for this site we can have fewer "moving parts" by statically generating the entire site.

## Local development is easier
Because you don't need a database behind a static site you can set up loacl development much more easily.

We have a virtual machine setup as a base for developing in Gatsby which we put on Github: https://github.com/customprogrammingsolutions/gatsbyjs-vagrant

We fine it is super easy to get up to speed with local development on a new box as a result. If you have any issues with our VM open a ticket and we will try to help you out.


## Deployments are much easier
Related to not having the database to maintain it's just really easy to push the files up to staging then to deploy to live.

Because it's just files being pushed around you don't need any of the worries associated with versioning of CMS packages either.

## Backup is essentially free
Because we have markdown and other static assets we just use our version control system (git) to keep track of content changes. Because we are mostly just dealing with static pages at a relatively low volume this works fine for us. This probably could scale up enough to meet our future needs too. If for some reason we needed a more complex authoring workflow this could become inappropriate, but we can cross that bridge when we get to it. (At that point we would likely switch to using Wagtail or similar as a CMS backend from which we would pull out the data the the existing front end. Note that if the backend gets unwieldly we can just switch it out without losing any of our existing front end code base value.)

This was a bit of a pain point for using some other systems. Setting up the backups with Drupal was a pain, the inital drupal 8 install we had didn't come with a CLI. So we wanted to install the CLI but that needed Drush, so we installed that just to find out that you couldn't use the CLI with a drupal install that wasn't made with composer. We had already thrown away multiple hours at this point to get to square 0 which meant a complete reinstall of the site to get easy CLI "cron-job"able backups, oh and we still had to backup the existing site without the CLI which meant dumping out data from the database with SQL directly. The default drupal 8 install not coming with CLI support strikes me as a rather bad developer experience point.


# Downsides
it would be disingenuous to say there's no downsides for this approach, overall from the perspecitve of our skills we find this to be a good match, hence why we use this, but if your team didn't have experience with ReactJS and GraphQL it would be a learning expense to get up to speed. Even knowing the requisite technologies there are a few downsides to this approach that are likely to aply to any team.

The biggest downside we find is that the editor experience isn't integrated into the site. We have a few people we collaborate with that aren't technical and it would make it harder for them to contribute, they are super smart professionals so we have no doubt that they would be able to pick up the skills to edit markdown files it would take them some time however and time is money.

So right now if anyone needed to post something and didn't know how to use Git we would just accept an email and then post it up for them. This of course wouldn't scale but all main contributors to our site can use Git effectively so it's a non issue. If lack of Git knowledge were to become an issue we would likely have to set up some form of a drop-off-box so that files could be uploaded outside the usual Git workflow, with some tooling to moderate the content before commiting the new files in. While learning the basics of Git would benefit them greatly they are busy professionals with a lot of work on their plates already.

One thing that has to be said in favor of WordPress is the editor experience is quite good. It lets people work on articles with a minimal amount of learning time required.

We are working on a way to give people a nice editor experience while retaining the benefits of a static site deployment such as this. However it is a work in progress right now, if this would benefit you let us know and we might be able to bump up the priority of this work.
