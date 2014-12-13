"use strict";

module.exports = DialogHelper;

var util = require('util'),
  c='<div id="%s"></div>',
  i="js-click-to-close",
  o=27;

// function DialogHelper($moduleApiProvider,$jQuery,$window){
function DialogHelper($jQuery, $window){
  this.$ = $jQuery;
  // if (this.$context.isBrowser) {
  // $window = $serviceLocator.resolve("window");
  this._window = $window;
  // this._api=$moduleApiProvider;
  // this._keyDownHandler=this._keyDownHandler.bind(this);
  // }
}

DialogHelper.prototype.$=null;
DialogHelper.prototype._api=null;
DialogHelper.prototype._window=null;

DialogHelper.prototype._lastDialogId="";

DialogHelper.prototype._lastDialogHash="";

DialogHelper.prototype.show=function(e,t){
  var self=this,
    i=this.$("body"),
    o=e+"_"+self,
    a=util.format(c,o);
  return i.append(a);
  // this._lastDialogHash=window.location.hash;
    // this._api.requestRender(e,t)
    //   .then(function(){
    //     var e=n.$("#"+o);
    //     e.find(".ui.modal").modal(
    //       {
    //         debug:!1,
    //         detachable:!1,
    //         onVisible:function(){
    //           n.$(".ui.dimmer.page")
    //             .height(Math.max(n.$(this).height()+n.$(this).offset().top+n.$("#main_footer").height(),n.$("#main_body").height()+3*n.$("#main_footer").height()))},
    //         onHidden:function(){
    //           n.hide()}})
    //     .modal("show"), n.initDialog(e),n._lastDialogId=o})
}

DialogHelper.prototype.hide=function(){
  // if (this._lastDialogId) {
  //   this.$(window.document).off("keydown",this._keyDownHandler);
  //   this.$(".ui.active.dimmer").remove(),
  //   this.$("#"+this._lastDialogId).remove();
  //   if (window.location.hash===this._lastDialogHash) {
  //     this._api.clearHash();
  //     this._lastDialogId=null;
  //     this._lastDialogHash=null;
  //   }
  // }
}

DialogHelper.prototype._keyDownHandler=function(e){
  if (e.keyCode===o) {
    this.hide();
    e.preventDefault();
  }
};

DialogHelper.prototype.initDialog=function(e){
  var self=this;
  // this.$(window.document).on("keydown", this._keyDownHandler);
  e.find("."+i).click(function(e){
    if (e.currentTarget===e.target) {
      self.hide();
    }
  });
  e.find("input").first().focus();
};


