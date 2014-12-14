'use strict';

module.exports = MainModule;

var SUBTITLES = {
  about: 'About Catberry Framework',
  commits: 'Commits to Catberry Framework repository',
  search: 'Search in Catberry code'
};

/**
 * Creates new instance of main module.
 * @param {string} title Site title.
 * @constructor
 */
function MainModule(title) {
  this._title = title;
}

/**
 * Current site title.
 * @type {string}
 * @private
 */
MainModule.prototype._title = '';

/**
 * Renders HEAD element of page.
 * This method is called when need to render "head" template of module "main".
 * @returns {Promise<Object>|Object|undefined} Data context.
 */
MainModule.prototype.renderHead = function () {
  return {
    title: this._title,
    subtitle: SUBTITLES[this.$context.state.page]
  };
};

/**
 * Renders root template on page.
 * This method is called when need to render "index" template of module "main".
 * @returns {Promise<Object>|Object|undefined} Data context.
 */
MainModule.prototype.renderIndex = function () {
  // return async result
  return new Promise(function (fulfill, reject) {
    setTimeout(function () {
      fulfill({message: 'Hello, world!'});
    }, 1);
  });
};
