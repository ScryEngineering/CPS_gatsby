# CPS gatsby site
This is the repo for CustomProgrammingSolutions site made with gatsbyjs.

For an overview of the project structure please refer to the [Gatsby documentation - Building with Components](https://www.gatsbyjs.org/docs/building-with-components/).

## Install

This site uses the setup in the Vagrantfile over in:
https://github.com/customprogrammingsolutions/gatsbyjs-vagrant

If you can't use the Vagrant file for setting up dependencies you will
at a minimum need to make sure that you have the Gatsby CLI program installed:
```sh
yarn global add gatsby-cli
```

Then you can run it by:
```sh
yarn run develop
```

## Deploy

Build the files
```sh
yarn run build
```

Then upload them to the host.
