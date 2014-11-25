'use strict';

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
module.exports = HomeModule;

/**
 * Creates new instance of "home" module.
 * @constructor
 */
function HomeModule() {
	/* constructor code here */
}

/**
 * Renders index template of module.
 * This method is called when need to render "index" template
 * of module "home".
 * @returns {Promise<Object>|Object|undefined} Data context.
 */
HomeModule.prototype.renderIndex = function () {
	return {text: 'Awesome content'};
};
