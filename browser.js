'use strict';

var catberry = require('catberry'),
  lazyLoader = require('catberry-lazy-loader'),
  // this config will be replaced by `./config/browser.json` when building
  // because of `browser` field in `package.json`
  config = require('./config/environment.json'),
  modal = require("./lib/modal"),
  cat = catberry.create(config);

  cat = catberry.create(config);

// register lazy loader plugin to Catberry Service Locator
lazyLoader.register(cat.locator);
cat.locator.register("modal", modal, config);

cat.startWhenReady();
