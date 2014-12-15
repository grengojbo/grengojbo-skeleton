'use strict';

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
module.exports = AuthModule;

var util = require('util'), // r
  SiteModule = require('../../lib/SiteModule'),
  jsFormSignUp = '.js-sign-up-form', // s
  jsErrorActivation = '.js-repeat-activation-error', // f
  jsErrorRegistration = '.js-registration-error', // h
  jsSuccessRegistration = '.js-registration-success-block', // M
  jsSuccessActivation='.js-repeat-activation-success', // b
  jsBlockRegistration = '.js-registration-block', // g
  validPassLength = 6, // y
  validLength = 3, //z
  validMaxLength = 60, // _
  dialogForgetPassword = 'dialog-forget-password', // T
  dialogRepeatActivation = 'dialog-repeat-activation', // x
  dialogGuest = 'dialog-guest'; // O

util.inherits(AuthModule, SiteModule);

/**
 * Creates new instance of 'auth' module.
 * @constructor
 */
function AuthModule($uhr, $jQuery, $serviceLocator) {
  this._uhr = $uhr;
  this.$ = $jQuery;
  this.config = $serviceLocator.resolve('config');
  if (this.$context.isBrowser) {
    this.modal = $serviceLocator.resolve('modal');
    this.modal.addClass('modal--resize');
  }
}

AuthModule.prototype.modal=null;

/**
 * Current UHR instance.
 * @type {UHR}
 * @private
 */
AuthModule.prototype._uhr = null;

/**
 * Current jQuery instance.
 * @type {jQuery}
 */
AuthModule.prototype.$ = null;

/**
 * Current config instance.
 * @type {config}
 */
AuthModule.prototype.config = null;


AuthModule.prototype.renderRegistration = function() {
  if(!this.isGuest()) {
    return void this.$context.redirect('/');
  }
  var content = this.createDataContext();
  return content;
};

AuthModule.prototype.handleSignup = function(event) {
  var self = this;
  console.log('----------- handleSignup -----------');
  if(event.isEnding) {
    console.log(event);
    // return void this.modal.hide();
    this.modal.hide();
    return;
  }
  if(!this.isGuest()) {
    return void this.$context.redirect('/');
  }
  return this.modal.show(this.$context.name,'signup')
  .then(function(){
    self._addValidationToRegistrationForm();
  });
};
AuthModule.prototype.submitSignup = function(event) {
  var  self=this,
     // locale = this.getCookieLocale(),
    erReg =this.$(jsErrorRegistration);
  console.log('-------------- submitSignup --------------');
};

AuthModule.prototype._addValidationToRegistrationForm = function() {
  if(this.$context.isBrowser){
    var
      messEmailError = 'Неправильный формат',
      messLength = util.format('Минимальная длина %d символов.', validPassLength),
      messPassConfirm = 'Пароль и подтверждение пароля несовпадают',
      messTermsError = 'Для использования сервиса вам необходимо согласится с условиями использования',
      messNameError = util.format('Количество символов: %d минимальное, %d максимальное.', validLength, validMaxLength);
    this.$(jsFormSignUp).form({
      name: {
        identifier: 'name',
        rules: [
          {
            type: 'length[' + validLength + ']',
            prompt: messNameError
          },
          {
            type: 'maxLength[' + validMaxLength + ']',
            prompt: messNameError
          }
        ]
      },
      email: {
        identifier: 'email',
        rules: [
          {
            type: 'email',
            prompt: messEmailError
          }
        ]
      },
      password: {
        identifier: 'password',
        rules:[
          {
            type: 'length[' + validPassLength + ']',
            prompt: messLength
          }
        ]
      },
      passwordConfirmation: {
        identifier: 'password-confirmation',
        rules:[
          {
            type: 'match[password]',
            prompt: messPassConfirm
          }
        ]
      }
    },
    {
      inline: true,
      on: 'blur',
      debug: true
    });
  }
};


/**
 * Renders index template of module.
 * This method is called when need to render 'index' template
 * of module 'auth'.
 * @returns {Promise<Object>|Object|undefined} Data context.
 */
AuthModule.prototype.renderIndex = function () {

  if(!this.isGuest()) {
    return void this.$context.redirect('/');
  }
  var data = {text: 'Awesome content'};
  var content = this.createDataContext(data);
  return content;
};
