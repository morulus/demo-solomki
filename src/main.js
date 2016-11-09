
var css = require("./game.css");
var template = require('raw!./template.html').replace(new RegExp("%className%", 'g'), css.className);
var jQuery = require('./d/jquery-1.7.2.min.js');
var Raphael = require('./d/raphael.js');
var GLOBALDUMP = require('./globaldump.js');
var R_SVG = require('./mrlsUI.js')(jQuery, GLOBALDUMP);

var mrls12 = require('./mrls12-main-ui.js');
var Solomki = require('./solomki.js')(jQuery, Raphael, R_SVG, GLOBALDUMP, mrls12);
require('./d/jquery.ie.rotate.js')(jQuery);
require('./d/jquery-animate-css-rotate-scale.js')(jQuery);
require('./bootstrap.js')(jQuery);

var data = {
  Solomki: Solomki,
  $: jQuery,
  css: css,
  template: template
}

module.exports = function app(element) {
  var $element = jQuery(element);
  $element.addClass(css.className);
  $element.html(template);
  setTimeout(function() {
    S = new Solomki(css);
    S.options.paper = jQuery('.paper-'+css.className);
    S.initial();
  });
}
