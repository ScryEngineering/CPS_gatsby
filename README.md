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
