[![license](https://img.shields.io/github/license/TobitSoftware/chayns-template-es6.svg)]() [![GitHub pull requests](https://img.shields.io/github/issues-pr/TobitSoftware/chayns-template-es6.svg)]() [![](https://img.shields.io/github/issues-pr-closed-raw/TobitSoftware/chayns-template-es6.svg)]()

# chayns+ES2015 Pagemaker Widget Template

This template offers you an easy start into developing widget for chayns® pagemakers using the chayns® API.

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

This project uses `webpack` and `Babel` for building and debugging. Keep in mind, that you need to set up a ssl certification to your webpack dev server or test your widget apart of the pagemaker, since the pagemaker only allows widgets imported via ssl certificated servers. You can start the `webpack-dev-server` with the following statement:

```
npm start
```

For creating an production build execute this code:

```
npm run release
```

To add this tapp to your Chayns site you need to follow these steps:

1. Go to your Pagemaker Tapp
2. Click on the Modeswitch -> 'chayns® manager'
3. Click on the FloatingButton (+ Button) and select the item with the angle brackets
4. A popup appears (if not, click on the menu button on the widget)
5. Set up the widget height (advice: only use elements that are fixed in their height)
6. Insert the url to your widgets resources. Has to be https protocol
7. Click on the menu button again -> activate chayns® API
8. Your pagemaker now has a widget using the chayns API
