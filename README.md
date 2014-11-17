#Catberry Empty Project

![Catberry](https://raw.githubusercontent.com/catberry/catberry/master/docs/images/logo.png)

## Getting started Developer

Install **node.js**. Then **sass**, **gulp** and **bower** if you haven't yet.

```
$ gem install sass
$ sudo npm -g install gulp bower
```

##How to use

This application only shows "Hello, world!" page.

First of all it is needed to install dependencies:

```
$ npm install
$ bower install
```

Разработка графического макета

```
$ gulp
```

Then to start in `debug` mode without script minification and with file watch:

```
$ npm run debug
$ gulp server
```

Подготовка релиза

```
$ gulp dist
$ gulp dist:release
```

To start in `release` mode:

```
npm start
```

##Contribution
If you have found a bug, please create pull request with [mocha](https://www.npmjs.org/package/mocha) 
unit-test which reproduces it or describe all details in issue if you can not 
implement test. If you want to propose some improvements just create issue or 
pull request but please do not forget to use `npm test` to be sure that your 
code is awesome.

All changes should satisfy this [Code Style Guide](https://github.com/catberry/catberry/blob/master/docs/code-style-guide.md).

Also your changes should be covered by unit tests using [mocha](https://www.npmjs.org/package/mocha).

Denis Rechkunov <denis.rechkunov@gmail.com>