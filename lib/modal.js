/*jslint browser: true*/
/*global $, jQuery, Modal*/
'use strict';

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
module.exports = Modal;

var util = require('util'),
  keyClose = 27; // o

// function Modal($moduleApiProvider, $jQuery, $window, $templateProvider){
function Modal($jQuery, $window, $templateProvider){
  this.$ = $jQuery;
  this._window = $window;
  // this._api=$moduleApiProvider;
  this._templateProvider = $templateProvider;
  this._keyDownHandler=this._keyDownHandler.bind(this);
}

Modal.prototype.$ = null;

Modal.prototype._api = null;

Modal.prototype._window = null;

Modal.prototype._lastModalId = '';

Modal.prototype._lastModalHash = '';

Modal.prototype.isShowBg = true;

Modal.prototype.setShowTime = 0;

Modal.prototype.isFocus = true;

Modal.prototype.options = {
  class: 'modal--show',
  buttonClose: 'modal-close',
  div: '<section class="%s" id="%s" tabindex="-1" role="Modal" aria-labelledby="modal-label" aria-hidden="true"></section>'
};

Modal.prototype.addClass = function(name) {
  this.options.class += ' ' + name;
};

Modal.prototype._modalElement = function(name) {
  return util.format(this.options.div, this.options.class, name);
};

// render id=home_dialog-test
// this.$context.name = home
// var data = data = {
//     header: false,
//     text: 'Hello word :-)',
//     footer: true
//   };
// this.Modal.show(this.$context.name, "dialog-test", data);
Modal.prototype.show = function(name, dialog, data){
  var self=this,
    el = this.$('body'),
    fullName = name + '_' + dialog;

  // console.log('---------------- show ----------------');
  // console.log(rend);
  el.append(this._modalElement(fullName));
  // console.log('---------------- / show ----------------');
  this._lastModalHash=this._window.location.hash;
  return self._templateProvider.render(fullName, data)
    .then(function(content){
      var section = self.$('#' + fullName);
      section.addClass('is-active');
      section.attr('aria-hidden', 'false');
      section.append(content);
      self.initModal(section);
      self._lastModalId=fullName;
    });
};

Modal.prototype.hide=function(){
  if (this._lastModalId) {
    this.$(this._window.document).off('keydown', this._keyDownHandler);
    var section = this.$('#' + this._lastModalId);
    section.attr('aria-hidden', 'true');
    section.remove();
    // console.log('remove: #' + this._lastModalId);
    if (this._window.location.hash===this._lastModalHash) {
      // this._api.clearHash();
      // this._templateProvider.clearHash();
      this._lastModalId=null;
      this._lastModalHash=null;
    }
  }
};

Modal.prototype._keyDownHandler=function(event){
  // console.log('----------- Modal keyDownHandler ----------');
  if (event.keyCode === keyClose) {
    // console.log('----------- Modal key Esc  ----------');
    this.hide();
    event.preventDefault();
  }
};

Modal.prototype.initModal=function(el){
  var self=this;
  // console.log('----------- Modal initModal  ----------');
  // console.log(el);
  this.$(this._window.document).on('keydown', this._keyDownHandler);
  if (!this.isShowBg) {
    // console.log('remove buttonClose');
    el.find('.' + self.options.buttonClose).remove();
  } else {
    el.find('.' + self.options.buttonClose).click(function(event){
      if (event.currentTarget===event.target) {
        self.hide();
      }
    });
  }
  if (this.isFocus) {
    el.find('input').first().focus();
  }
};


