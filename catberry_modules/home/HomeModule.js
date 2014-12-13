'use strict';

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
module.exports = HomeModule;

/**
 * Creates new instance of "home" module.
 * @constructor
 */
function HomeModule($serviceLocator) {
	if (this.$context.isBrowser) {
      this.dialogHelper=$serviceLocator.resolve('dialogHelper');
    }
}

HomeModule.prototype.dialogHelper=null;

// HomeModule.prototype._handleDialog=function(e,t){
      // return t.isEnding?(this.dialogHelper.hide(),
      // Promise.resolve()):this.dialogHelper.show(this.$context.name,e)
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
  this.dialogHelper.show(this.$context.name,'dialog-test');
};