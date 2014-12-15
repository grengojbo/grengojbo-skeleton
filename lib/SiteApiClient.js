"use strict";

module.exports = SiteApiClient;


 var util = require("util"), // c
  i='Request to API %s "%s"',
  o='Response from API %s "%s" (%dms)';

function SiteApiClient($serviceLocator, $logger){
    // var oauth = $serviceLocator.resolve("oauth2FlowFactory");
    // this.asGuest = oauth.createResourceServer("clientToken");
    // this.asUser = oauth.createResourceServer("passwordToken");
    this._logger = $logger;
};

SiteApiClient.prototype._logger=null;

SiteApiClient.prototype.asGuest=null;

SiteApiClient.prototype.asUser=null;
