/*jslint browser: true*/
/*global $, jQuery, Modal*/
"use strict";

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
module.exports = SiteModule;

var util = require('util');

function SiteModule($serviceLocator){
  this.config=$serviceLocator.resolve("config");
  this.locator=$serviceLocator;
};

SiteModule.prototype.config=null;

SiteModule.prototype.locator=null;

SiteModule.prototype.render=function(){
  return this.createDataContext();
};

SiteModule.prototype.isGuest=function(){
  return true;
};

SiteModule.prototype.createDataContext = function(data){
  if (data) {
    return data;
  } else{
    return {};
  }
};