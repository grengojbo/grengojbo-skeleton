'use strict';

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
module.exports = NotificationModule;

/**
 * Creates new instance of "notification" module.
 * @constructor
 */
function NotificationModule() {
	/* constructor code here */
}

/**
 * Renders index template of module.
 * This method is called when need to render "index" template
 * of module "notification".
 * @returns {Promise<Object>|Object|undefined} Data context.
 */
NotificationModule.prototype.renderIndex = function () {
	return {text: 'Awesome content'};
};
