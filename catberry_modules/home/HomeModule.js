'use strict';

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
module.exports = HomeModule;

/**
 * Creates new instance of "home" module.
 * @constructor
 */
function HomeModule($serviceLocator) {
	if (this.$context.isBrowser) {
    this.modal=$serviceLocator.resolve('modal');
    this.modal.isShowBg = true;
  }
};

HomeModule.prototype.modal=null;

// HomeModule.prototype._handlemodal=function(e,t){
      // return t.isEnding?(this.modal.hide(),
      // Promise.resolve()):this.modal.show(this.$context.name,e)
    // }
/**
 * Renders index template of module.
 * This method is called when need to render "index" template
 * of module "home".
 * @returns {Promise<Object>|Object|undefined} Data context.
 */
HomeModule.prototype.renderIndex = function () {
	return {text: 'Awesome content'};
};

HomeModule.prototype.afterRenderIndex = function () {
  console.log('---------------- HomeModule ----------------');
  this.modal.addClass('animated-hover');
  // console.log(this.modal.options);
  var data = {
    header: false,
    text: 'Hello word :-)',
    footer: true
  };
  this.modal.show(this.$context.name,'dialog-test', data);
};