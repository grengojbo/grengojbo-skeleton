'use strict';

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
module.exports = AuthModule;

var util = require('util'), // r
  // c = require('../../lib/helpers/userHelper'),
  SiteModule = require('../../lib/SiteModule'),
  // o='.js-sign-in-form',
  // a='.js-password-recovery-form',
  jsFormSignUp = '.js-sign-up-form', // s
  // l='.js-forget-form',
  // u='.js-repeat-activation-form',
  // d='.js-login-error',
  // p='.js-forget-error',
  jsErrorActivation = '.js-repeat-activation-error', // f
  jsErrorRegistration = '.js-registration-error', // h
  jsSuccessRegistration = '.js-registration-success-block', // M
  jsSuccessActivation='.js-repeat-activation-success', // b
  // m='.js-password-recovery-success',
  // v='.js-password-recovery-error',
  // A='.js-forget-success',
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
  // i.call(this,$serviceLocator);
  this._uhr = $uhr;
  this.$ = $jQuery;
  this.config = $serviceLocator.resolve('config');
  if (this.$context.isBrowser) {
    this.modal = $serviceLocator.resolve('modal');
    this.modal.addClass('modal--resize');
  //   this._addValidationToLoginForm();
  //   this._addValidationToPasswordRecovery();
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

// AuthModule.prototype.renderMenu = function() {
//   var self = this;
//     // locale = this.getCookieLocale(),
//     // t= self.createDataContext(),
//     return this.konfettin.getCurrentUser(this.$context)
//       .then(function(r){
//         var i=r&&'object'==typeof r?r:{};
//         return c.prepareUser( self.l10n,locale,i),t.user=i,t
//       },function(){return t})
// };

// AuthModule.prototype.renderLogin = function(){
//   if (this.isGuest()) {
//     return this.createDataContext();
//   } else {
//     return void this.$context.redirect('/');
//   }
// };

// AuthModule.prototype.afterRenderLogin = function(){
//   if (this.$context.isBrowser) {
//     this._addValidationToLoginForm();
//   }
// };

AuthModule.prototype.renderRegistration = function() {
  if(!this.isGuest()) {
    return void this.$context.redirect('/');
  }
  var content = this.createDataContext();
  // content.defaultCity = this.getDefaultCity();
  return content;
};

// AuthModule.prototype.afterRenderRegistration = function(){
//   if (this.$context.isBrowser) {
//     this._addValidationToRegistrationForm();
//   }
// };

// AuthModule.prototype.afterRenderPasswordRecovery = function() {
//   if (this.$context.isBrowser) {
//     this._addValidationToPasswordRecovery();
//   }
// };

// AuthModule.prototype.renderActivation = function() {
//   if(!this.isGuest()) {
//     return void this.$context.redirect('/');
//   }
//   var self = this,
//   token = this.$context.state.activationToken;
//   if(token) {
//     return this.konfettin.activateUser(this.$context, token)
//     .then(function(){
//       var token= self.createDataContext();
//       if (token.isSuccess) {
//         return token;
//       } else {
//         return void this.$context.redirect('/');
//       }
//     });
//   }
// }

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
  // return;
};
// AuthModule.prototype.handleGuest = function(event) {
//   return this._handleDialog(dialogGuest, event);
// };

// AuthModule.prototype.handleForgetPassword = function(event) {
//   if(event.isEnding) {
//     return void this.dialogHelper.hide();
//   }
//   if(this.isGuest()) {
//     var self = this;
//     return this.dialogHelper.show(this.$context.name, dialogForgetPassword)
//     .then(function(){
//       self._addValidationToForgetForm();
//     });
//   }
// };

// AuthModule.prototype.handleRepeatActivation = function(event){
//   if(event.isEnding) {
//     return void this.dialogHelper.hide();
//   }
//   if(this.isGuest()) {
//     var  self=this;
//     return this.dialogHelper.show(this.$context.name, dialogRepeatActivation)
//     .then(function() {
//       self._addValidationToActivationForm();
//     });
//   }
// };

// AuthModule.prototype.handleSignOut = function(event) {
//   if(!event.isEnding) {
//     var  self=this;
//     return this.konfettin.signOut(this.$context)
//     .then(function(){
//       return Promise.all([
//         self.$context.requestRefresh( self.$context.name, 'menu'),
//         self.$context.requestRefresh('mainPages', 'head'),
//         self.$context.requestRefresh('mainPages', 'pages')
//       ]);
//     });
//   }
// };

AuthModule.prototype.submitSignup = function(event) {
  var  self=this,
     // locale = this.getCookieLocale(),
    erReg =this.$(jsErrorRegistration);
  console.log('-------------- submitSignup --------------');
  // return this.konfettin.registerUser(this.$context,{
  //   city: event.values.city,
  //   name: event.values.name,
  //   email: event.values.email,
  //   password: event.values.password
  // }).then(function(){
  //   this.$(jsSuccessRegistration).show();
  //   this.$(jsBlockRegistration).hide();
  //   erReg.hide();
  // }).then(null,function(){
  //   erReg.text(self.l10n.get(locale,'AUTH_REGISTRATION_ERROR'));
  //   erReg.show();
  // });
};

// AuthModule.prototype.submitActivation=function(event){
//   var self=this,
//     // locale=this.getCookieLocale(),
//     reg =this.$(jsErrorActivation);
//   return this.konfettin.repeatActivation(this.$context,event.values.email)
//   .then(function() {
//     this.$(jsSuccessActivation).show();
//     reg.hide();
//   }).then(null,function(){
//     reg.text(self.l10n.get(locale,'AUTH_REPEAT_ACTIVATION_ERROR'));
//     reg.show();
//   });
// };

// AuthModule.prototype.submitLogin=function(e){
//     var t=this,
//     n=t.locator.resolve('jQuery'),
//     r=n(d),
//     c=this.getCookieLocale(),
//     i=window.location.protocol+'//'+window.location.host;
//     return this.uhr.post(i+'/auth/user', {
//       headers:{
//         'Content-Type':'application/x-www-form-urlencoded'
//       },
//       data:{
//         username:e.values.email,
//         password:e.values.password
//       }
//     }).then(function(e){
//       if(200!==e.status.code)
//         throw new Error(t.l10n.get(c,'AUTH_CREDENTIALS_ERROR'));
//       return Promise.all([
//         t.$context.requestRefresh(t.$context.name,'menu'),
//         t.$context.requestRefresh('mainPages','head')
//       ])
//     }).then(function(){
//       return t.$context.redirect(t.$context.referrer.authority.toString()===t.$context.location.authority.toString()?t.$context.referrer.toString():'/')
//     }).then(null,function(e){
//       r.text(e.message),
//       r.show()})
//   },
  // AuthModule.prototype.submitForget=function(e){
  //   var t=this,
  //   n=t.locator.resolve('jQuery'),
  //   r=n(p),
  //   c=this.getCookieLocale();
  //   return this.konfettin.sendResetPasswordLink(this.$context,e.values.email)
  //     .then(function(){
  //       n(A).show(),
  //       r.hide()
  //     }).then(null,function(){
  //       r.text(t.l10n.get(c,'AUTH_FORGET_ERROR')),
  //       r.show()
  //     })
  // },
  // AuthModule.prototype.submitPasswordRecovery=function(e){
  //   var t=this,
  //   n=t.locator.resolve('jQuery'),
  //   r=n(v),c=this.getCookieLocale();
  //   return this.konfettin.resetPassword(this.$context,this.$context.state.resetToken,e.values.password)
  //     .then(function(){
  //       r.hide(),
  //       n(m).show()}).then(null,function(){r.text(t.l10n.get(c,'AUTH_PASSWORD_RECOVERY_ERROR')),r.show()
  //     })
  // },

AuthModule.prototype._addValidationToRegistrationForm = function() {
  if(this.$context.isBrowser){
    var
      messEmailError = 'Неправильный формат',
      messLength = util.format('Минимальная длина %d символов.', validPassLength),
      messPassConfirm = 'Пароль и подтверждение пароля несовпадают',
      messTermsError = 'Для использования сервиса вам необходимо согласится с условиями использования',
      messNameError = util.format('Количество символов: %d минимальное, %d максимальное.', validLength, validMaxLength);
      // locale=this.getCookieLocale(),
      // messTermsError = this.l10n.get(t,'AUTH_FORM_TERMS_ERROR'),
      // messEmailError = this.l10n.get(t,'AUTH_FORM_LOGIN_ERROR'),
      // messPassConfirm = this.l10n.get(locale,'AUTH_FORM_PASSWORD_CONFIRMATION_ERROR'),
      // messLength = util.format(this.l10n.get(locale,'AUTH_FORM_PASSWORD_ERROR'), validPassLength),
      // messNameError = util.format(this.l10n.get(locale,'AUTH_FORM_NAME_ERROR'), validLength, validMaxLength);
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
      // terms: {
      //   identifier: 'terms',
      //   rules: [
      //     {
      //       type: 'checked',
      //       prompt: messTermsError
      //     }
      //   ]
      // },
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
  // content.defaultCity = this.getDefaultCity();
  return content;
	// return {text: 'Awesome content'};
};
