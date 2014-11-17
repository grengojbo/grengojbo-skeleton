#  Новый проект

Создаем проект с [git](http://git-scm.com/downloads).

```
mkdir example-site
cd  example-site
git init
echo "0.0.1" > VERSION
git add -A
git commit -m "first commit"
```

Публикуем на [github](https://github.com) если нужно приватный репозитарий то бесплатно можно создать на [bitbucket](https://bitbucket.org)

```
git remote add origin git@github.com:grengojbo/example-site.git
или приватный
git remote add origin git@bitbucket.org:passage-mall/passage-site.git

git push -u origin master
```

Делаем форк шаблона приложения, для удобства я использую [github/hub](https://github.com/github/hub).

```
git remote add skeleton grengojbo/grengojbo-skeleton
```

Заменяем *grengojbo-skeleton* на твя вашего проекта -> *example-site* в файлах [package.json](./package.json) [bower.json](./bower.json). Редактируем описание вашего проекта в файде [package.json](./package.json).

## Getting started Developer

Install **git** **hub** **node.js**. Then **sass**, **gulp** and **bower** if you haven't yet.

```
sudo brew install --HEAD hub

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