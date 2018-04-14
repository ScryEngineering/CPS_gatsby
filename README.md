# CPS gatsby site
This is the repo for CustomProgrammingSolutions site made with gatsbyjs.

For an overview of the project structure please refer to the [Gatsby documentation - Building with Components](https://www.gatsbyjs.org/docs/building-with-components/).

## Install

This site uses the setup in the Vagrantfile over in:
https://github.com/customprogrammingsolutions/gatsbyjs-vagrant

We are using the Yarn package manager to deal with package dependencies.

If you can't use the Vagrant file for setting up dependencies you will
at a minimum need to make sure that you have the Gatsby CLI program installed:
```sh
yarn global add gatsby-cli
```

## Development

Make sure that the package dependencies are installed correctly.
On a fresh clone of this repo issue the following command at the
root directory of the project:

```sh
yarn install
```
This will read the `yarn.lock` file and make sure all dependencies are installed.

To run Gatsby in development mode:

```sh
gatsby develop
```
Will fire up a development server on localhost.

Note that you may need to run as sudo and specify the port if you have used the Vagrant box with Alpine linux:

```sh
sudo gatsby develop -H 0.0.0.0
```
(There might be a way set up the linux box such that specifying to serve on 0.0.0.0
is not necessary but I haven't done that, if you fix this please upstream the fix to:
https://github.com/customprogrammingsolutions/gatsbyjs-vagrant)


## Deploy

Build the files
```sh
yarn run build
```

Then upload them to the host.


## Writing posts
Right now this site is set up such that it is convienent to write posts using markdown because we are leveraging the gatsby-transformer-remark plugin to create pages on the site from markdown input.

The directory that content is pulled from is specified in `gatsby-config.js` as settings to `gatsby-source-filesystem` plugin.

When you are writing a post in markdown you can specify the excerpt by using the separator configured in `gatsby-config.js` in the `excerpt_separator` option for the `gatsby-transformer-remark` plugin.

For now it is `<!-- end excerpt -->`. 
You would use this like so:

```markdown
---
title: "how to use the excerpt separator"
date: "2018-02-06"
tags:
    - markdown
    - excerpts
    - howto
    - someOtherTag
---

The excerpt written here can be used on various pages to render a summary, don't make it too long though as that might break formatting on some listing pages in the site!

<!-- end excerpt -->

Rest of the tutorial text is here....
```

Note how various metadata is specified in the frontmatter (the bit separated by the `---`)