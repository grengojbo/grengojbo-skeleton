#  Новый проект

## Приступая к работе для разработчика

Необходимо установить [git](http://git-scm.com/downloads) [github/hub](https://github.com/github/hub) **node.js**. Then **sass**, **gulp** and **bower** if you haven't yet.

```
sudo brew install --HEAD hub

$ gem install sass
$ sudo npm -g install gulp bower
```

Создаем проект с .

```
mkdir example-site
cd  example-site
git init
echo "0.0.1" > VERSION
git add -A
git commit -m "first commit"
```

Публикуем на [github](https://github.com) если нужно приватный репозитарий то бесплатно можно создать на [bitbucket](https://bitbucket.org).

```
git remote add origin git@github.com:grengojbo/example-site.git
или приватный
git remote add origin git@bitbucket.org:grengojbo/example-site.git

git push -u origin master
```

Делаем форк шаблона приложения, для удобства я использую [github/hub](https://github.com/github/hub).

```
git remote add skeleton https://github.com/grengojbo/grengojbo-skeleton.git
git fetch skeleton
git merge skeleton/master
```

## Работа с вашей копией проекта

Заменяем *grengojbo-skeleton* на имя вашего проекта -> *example-site* в файлах [package.json](./package.json) [bower.json](./bower.json). Редактируем описание вашего проекта в файде [package.json](./package.json).

Это приложение показывает только "Hello, world!".

В первую очередь необходимо установить зависимости для разработчика:

```
npm install
bower install
```

После этих нехитрых действий можно приступать к разработке графического макета. Что необходимо помнить:
 - верстальщик работает с директорией **src**
 - стили в **scss**
 - сторонии JavaScript библиотеки в **vendor**
 - изображения в **images**
 - макеты страниц расположены в **templates**, шаблонизатор [dust](http://akdubya.github.io/dustjs/)
 - содержимое тега **head** в [src/templates/main/placeholders/head.dust](./src/templates/main/placeholders/head.dust)

ВАЖНО ПОМНИТЬ: верстальщик всегда рабоает с одним файлом [src/templates/index.html](./src/templates/index.html). Если ему необходимо сверстать страницу ленты новостей то он создает файл **/src/templates/news.html** и в файле [/src/templates/index.html](./src/templates/index.html) меняет: **@@include('home.html')** -> **@@include('news.html')**

В терминале запустите задачу **gult** и работайте в вашем любимом редакторе например [SublimeText3](http://www.sublimetext.com/3).

```
gulp
...
20:39:39] Starting 'serve'...
[20:39:42] Finished 'serve' after 2.51 s
[20:39:42] Starting 'default'...
[20:39:42] Finished 'default' after 13 μs
[grengojbo-skeleton] Local URL: http://localhost:3000
[grengojbo-skeleton] External URL: http://192.168.1.129:3000
[grengojbo-skeleton] Serving files from: public/tmp
[grengojbo-skeleton] Serving files from: src
[grengojbo-skeleton] Serving files from: public
...
```

При этом [откроется](http://localhost:3000) страничка в броузере, а если открыть *External URL* ```http://192.168.1.129:3000``` в броузерах на других компьютерах то изменените scss, html, js файл и можно в реальном времент смотрить результат на всех гаджетах (при настройке tunnel, xio) даже заказчик с может смотреть.

## Пишем ваш JS

Меняем файлы в директории **src/templates**

например вставляем на домашнюю страницу работу верстальщика в файле src/templates/main/placeholders/__index.dust*

```html
<!--This is reference to placeholder 'index' of module 'pages'-->
<div class="main" id="pages_index">
    @@include('../../home.html')
</div>
```

В первом окне терминала запускаем web сервер в режиме отладки

```
$ npm run debug
```

Во втором

```
$ gulp server
```

Проверяем как будет работать на рабочем сервере

```
gulp dist
npm start
gulp server:dist
```

Подключение к рабочему процессу програмиста, меняем заглушки на API.

Публикация проекта на [heroku](https://www.heroku.com/) или приватном на основе [deis](deis.io) непример [uatv.me](http://deis.uatv.me/). Для Linux или MacOS X [Makefile](./Makefile) в комплекте. Меняем в [Makefile](./Makefile)
 
## Для програмиста

модули Catberry:

  - **main** основной шаблон страницы, а также отвечает за содержимое тега *head*
  -  

## Памятка

Получить последние изменения из [grengojbo-skeleton](https://github.com/grengojbo/grengojbo-skeleton)

```
git fetch skeleton
```

Посмотреть что изменилось

```
git diff skeleton/master
```

Применить изменения

```
git merge skeleton/master
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