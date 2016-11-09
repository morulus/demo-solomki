module.exports = function($, GLOBALDUMP) {
		return function R_SVG(options) {
		if (options==undefined) options = {};
		this.R = null;
		this.SVGFILE = null;
		this.items = {};
		this.dump = {};
		//> options
		this.options = {
			fixedfill: (options.fixedfill!=undefined) ? options.fixedfill : -1,
			fixedstroke: (options.fixedstroke!=undefined) ? options.fixedstroke : -1,
			pathprefix:(options.pathprefix!=undefined) ? options.pathprefix : 'path',
			dontfillnoz: true // < Запрет заливки не закрытых конутров
		}

		this.afterfunc = function() {

		};



		this.get = function(R, SVGFILE, witheach) {

			this.R = R;
			this.afterfunc = witheach;
			this.SVGFILE = SVGFILE;
			// Читаем SVG
			//
			
			if(false) { //navigator.userAgent.toLowerCase().indexOf('msie')==-1
				$.get(this.SVGFILE, function(data) {
					this.interprint(data);
				}.bind(this));
			} else { // < IE

				var dumppath = this.SVGFILE.split('/');
				dumppath = dumppath[dumppath.length-1].split('.');
				dumppath = dumppath[dumppath.length-2];

				this.interprint(GLOBALDUMP[dumppath], true);

			}


		}

		this.interprint = function(data, faultmode) {
			if (faultmode==undefined) faultmode = false;
			if (faultmode) { // Браузер инвалид

				for (var key in data) {

						attr ={};

						this.items[this.options.pathprefix+''+key] = this.R.path(data[key].path).attr(data[key].attr);
				}

			} else {

				$(data).find('path').each(function(key, value) {
					attr ={};
					if ($(value).attr('d').charAt($(value).attr('d').length-1)=='z') {
						if (this.options.fixedfill!=-1) attr.fill = this.options.fixedfill; else if ($(value).attr('fill')) attr.fill = $(value).attr('fill');
					} else {
						attr.fill = false;
					}
					if (this.options.fixedstroke!=-1) attr.stroke = this.options.fixedstroke; else if ($(value).attr('stroke')) attr.stroke = $(value).attr('stroke');

					if (this.options.fixedstroke!=false) { if ($(value).attr('stroke-miterlimit')) attr['stroke-miterlimit'] = $(value).attr('stroke-miterlimit'); }

					this.items[this.options.pathprefix+''+key] = this.R.path($(value).attr('d')).attr(attr);

					//this.dump[this.options.pathprefix+''+key] = {path: $(value).attr('d'), attr: attr};
				}.bind(this));
			}
			this.afterfunc();
		}
	}
};
