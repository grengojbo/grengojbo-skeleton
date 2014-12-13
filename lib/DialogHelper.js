"use strict";

module.exports = DialogHelper;

var util = require('util'),
  // elDiv='<div id="%s"></div>', // c
  elDiv = '<section class="modal--show" id="%s" tabindex="-1" role="dialog" aria-labelledby="modal-label" aria-hidden="true"></section>',
  buttonClose = "modal-close", // i
  keyClose = 27; // o

// function DialogHelper($moduleApiProvider,$jQuery,$window){
function DialogHelper($moduleApiProvider, $jQuery, $window){
  this.$ = $jQuery;
  this._window = $window;
  // if (this.$context.isBrowser) {
  // $window = $serviceLocator.resolve("window");
  this._api=$moduleApiProvider;
  this._keyDownHandler=this._keyDownHandler.bind(this);
  // }
}

DialogHelper.prototype.$=null;
DialogHelper.prototype._api=null;
DialogHelper.prototype._window=null;

DialogHelper.prototype._lastDialogId="";

DialogHelper.prototype._lastDialogHash="";

// render id=auth_dialog-forget-password
// this.$context.name = auth
// this.DialogHelper.show("dialog-forget-password", )
DialogHelper.prototype.show=function(name, dialog){
  var self=this,
    el = this.$("body"),
    elId = name + "_" + dialog,
    rend = util.format(elDiv, elId);

  console.log('---------------- show ----------------');
  console.log(rend);
  el.append(rend);
  console.log('---------------- / show ----------------');
  this._lastDialogHash=this._window.location.hash;
  // var res =self.$context.render(name, dialog);
  // console.log(res);
  // return;
  // var data = {text: 'hello word!'};
  return this._api.requestRender(name, dialog)
    .then(function(){
      var modal = self.$('#' + elId);
      modal.addClass('is-active');
  //     modal.find(".ui.modal")
  //       .modal({
  //         debug: false,
  //         detachable: false,
  //         onVisible: function(){
  //           self.$(".ui.dimmer.page")
  //             .height(Math.max(self.$(this).height()+self.$(this).offset().top+self.$("#main_footer").height(),self.$("#main_body").height()+3*self.$("#main_footer").height()));
  //         },
  //         onHidden:function(){
  //             self.hide();
  //         }
  //     }).modal("show");
      self.initDialog(modal);
      self._lastDialogId=elId;
    });
}

DialogHelper.prototype.hide=function(){
  if (this._lastDialogId) {
    this.$(this._window.document).off('keydown', this._keyDownHandler);
    // this.$(".ui.active.dimmer").remove(),
    this.$('#' + this._lastDialogId).remove();
    console.log('remove: #' + this._lastDialogId);
    if (this._window.location.hash===this._lastDialogHash) {
      this._api.clearHash();
      this._lastDialogId=null;
      this._lastDialogHash=null;
    }
  }
};

DialogHelper.prototype._keyDownHandler=function(event){
  if (event.keyCode === keyClose) {
    this.hide();
    event.preventDefault();
  }
};

DialogHelper.prototype.initDialog=function(el){
  var self=this;
  console.log('----------- DialogHelper initDialog  ----------')
  this.$(this._window.document).on("keydown", this._keyDownHandler);
  el.find("." + buttonClose).click(function(e){
    if (el.currentTarget===el.target) {
      self.hide();
    }
  });
  el.find("input").first().focus();
};


