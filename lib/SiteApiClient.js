"use strict";

module.exports = SiteApiClient;


 var util = require("util"), // c
  i='Request to API %s "%s"',
  o='Response from API %s "%s" (%dms)';

function SiteApiClient($serviceLocator, $logger){
    var oauth = $serviceLocator.resolve("oauth2FlowFactory");
    this.asGuest = oauth.createResourceServer("clientToken");
    this.asUser = oauth.createResourceServer("passwordToken");
    this._logger = $logger;
};

n.prototype._logger=null;

n.prototype.asGuest=null;

n.prototype.asUser=null;

n.prototype.get=function(e,t,n){
    return this.request(e,"get",t,n)
};
n.prototype.post=function(e,t,n){
    return this.request(e,"post",t,n)
};
n.prototype.put=function(e,t,n){
      return this.request(e,"put",t,n)
};
n.prototype.delete=function(e,t,n){
    return this.request(e,"delete",t,n)
};
n.prototype.patch=function(e,t,n){
    return this.request(e,"patch",t,n)
};
n.prototype.request=function(e, metod,n,r){
    var a=this.asUser.isAuthorized(e)?this.asUser:this.asGuest;r=r||{};
    var self = this;
    delete r.token;
    var dt = new Date;
    return this._logger.trace(util.format(i,t.toUpperCase(),n)),
    a.request(e,{
      headers:{
        Accept:"application/json;q=1"
      },
      path: n,
      method: t,
      data: r
    }).then(function(e){
      return  self._logger.trace(util.format(o,t.toUpperCase(),n,new Date-dt)),e
    })
};