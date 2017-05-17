[![license](https://img.shields.io/github/license/TobitSoftware/chayns-template-es6.svg)]() [![GitHub pull requests](https://img.shields.io/github/issues-pr/TobitSoftware/chayns-template-es6.svg)]() [![](https://img.shields.io/github/issues-pr-closed-raw/TobitSoftware/chayns-template-es6.svg)]()

# chayns+ES2015 Template

This template will show you the basic project structure for building your own custom Tapps with `ES2015` and the `chayns`-Framework.

### Requirements

* [A free Chayns Site](https://chayns.tobit.software/)
* Node.js

## Getting started

The template is based on several npm-Packages, which have to be installed first. If you haven´t installed `node.js` already, please install it now.
For installing the dependencies you have to open your `node.js` terminal, change the path to the cloned project and run:

```
npm i
```

For setting up the recommended folder structure you just have to run:

```
npm run setup
```

This project uses `webpack` and `Babel` for building and debugging. You can start the `webpack-dev-server` with the following statement:

```
npm start
```

For creating an production build execute this code:

```
npm run release
```

To add this tapp to your Chayns site you need to follow these steps:

1. Go to configuration -> Tapps
2. Click ```Add Tapp```
3. Use external content
4. Fill out the name and in the field data source set an url like this: ```http://localhost:8080/index.html```
5. Click ```add```
6. If your website isn't running make sure you have entered ```npm start```
