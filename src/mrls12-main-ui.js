var jQuery = require('./d/jquery-1.7.2.min.js');
/*
 *
 */
function ajax(uin, data, okfunc) {

		jQuery.ajax({
			url: "index.php",
			type: "POST",
			data: data,
			dataType: 'json',
			cache: false,
			error: function(json) { alert(json.responseText);  },
			success: function(json){

				okfunc(json, uin);
			}
		});
	}

/**
 * Отображает содержимое объекта (осторожна - бесконечная вложенность)
 */
function dump(obj, obj_name, div) {
    if (div==undefined) div = "\n";
  var result = '';
  for (var i in obj)
    result += obj_name + '.' + i + ' = ' + obj[i] + div;
  return result
}

/**
 * Привязка к функции this
 */
// Function.prototype.bind = function() {
//     if (arguments.length < 1 && typeof arguments[0] != "undefined") return this;
//     var __method = this, args = [];
//     for(var i=0;i<arguments.length;i++){ args.push(arguments[i]);}
//
//     var object = args.shift();
//     return function() {
//       var args_to_apply = []
//
//       for(var i=0;i<args.length;i++){ args_to_apply.push(args[i]);}
//       for(var i=0;i<arguments.length;i++){ args_to_apply.push(arguments[i]);}
//       return __method.apply(object, args_to_apply);
//     }
// };

var pro = function() {
    var object = this;
    if (arguments.length < 1 && typeof arguments[0] != "undefined") return this;
    var __method = this, args = [];
    for(var i=0;i<arguments.length;i++){ args.push(arguments[i]);}


    return function() {
      var args_to_apply = []

      for(var i=0;i<args.length;i++){ args_to_apply.push(args[i]);}
      for(var i=0;i<arguments.length;i++){ args_to_apply.push(arguments[i]);}
      return __method.apply(object, args_to_apply);
    }
};

/**
 * Когда значение не может являться нулем: нулевые значения width не работают в Mac OS!
 */

function not0(num) {

    if (num<1) {
       num = 1;
    }
    return num;
}

module.exports = {
	pro: pro
}
