/*jslint browser: true*/
/*global $, jQuery, Modal*/
"use strict";

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
module.exports = SiteModule;

var util = require('util');

function SiteModule($serviceLocator){
  this.config=$serviceLocator.resolve("config");
  this.locator=$serviceLocator;
  // this.api=$serviceLocator.resolve("SiteApiClient");
  // this.localizationLoader=$serviceLocator.resolve("localizationLoader");
  // this.l10n=$serviceLocator.resolve("localizationProvider");
  // if (this.$context.isBrowser) {
    // this.dialogHelper=$serviceLocator.resolve("dialogHelper");
  // }
};

// SiteModule.prototype.api=null;

// SiteModule.prototype.localizationLoader=null;

// SiteModule.prototype.dialogHelper=null;
// SiteModule.prototype.l10n=null;

SiteModule.prototype.config=null;

SiteModule.prototype.locator=null;

SiteModule.prototype.render=function(){
  return this.createDataContext();
};

SiteModule.prototype.isGuest=function(){
  // return!this.api.asUser.isAuthorized(this.$context);
  return true;
};

SiteModule.prototype.createDataContext = function(data){
  if (data) {
  // return event=event||{};
  // data.locale=this.getCookieLocale();
  // data.isGuest=this.isGuest();
    return data;
  } else{
    return {};
  }
};