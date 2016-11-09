
module.exports = function(jQuery, Raphael, R_SVG, GLOBALDUMP, mrls12) {
	return function Solomki(config) {
		this.config = config;
		this.R = null;

		// > Options
		this.options = {
			paper: null,
			colors: [
				[180, '#8f5f6b', '#9a5c74', '#7f5260', '#66433e'],
				[180, '#6e7163', '#767f75', '#6e7163', '#696759'],
				[180, '#d89a63', '#b55335', '#d2826d', '#dcab9f'],
				[180, '#676021', '#81a042', '#b7cb95', '#cddab9'],
				[180, '#876021', '#e0a747', '#dfc99a', '#dccaa3']
				/*

				[180, '#643a3f', '#9a5c74', '#8d5259', '#ffb7c7'],
				[180, '#5e6f2d', '#889f40', '#d9fa67', '#ffff87'],
				[180, '#8e3f2e', '#bf553e', '#f58764', '#ffbd8b'],
				[180, '#876f2d', '#b6943d', '#fdfd6c', '#ffff87'],
				[180, '#535543', '#7f8266', '#c7cca1', '#ffffd1']
				*/
			]
		}

		this.path = null;
		this.pathshadows = null;

		this.session = {
			initialed: false,
			almost: 0,
			npc_taked: 0,
			pc_taked: 0,
			PCgonnatake: 0,
			PCmusttake: 0,
			taked: {},
			speaktimer: false,
			firststart: true,
			module: 10,
			icalc: 0,
			rotate: null
		}

		this.turns = [];

		this.browser = {};

		this.history = [];

		this.waitforlasttake = false;

		(function(navigator) {
			// > GET BROWSER



			this.browser = {};
			this.browser.opera = false;
			this.browser.chrome = false;
			this.browser.name = 'unknown';
			this.browser.ie = false;
			this.browser.ie7 = false;

			if (navigator.userAgent.toLowerCase().indexOf('opera')>-1) {
				this.browser.opera = true;
				this.browser.name = 'opera';
			}
			if (navigator.userAgent.toLowerCase().indexOf('chrome')>-1) {

				this.browser.chrome = true;
				this.browser.name = 'chrome';
			}

			if (navigator.userAgent.toLowerCase().indexOf('msie 9')>-1) {
				this.browser.ie = true;
				this.browser.iemin = false;
				this.browser.name = 'ie9';
			}

			if (navigator.userAgent.toLowerCase().indexOf('msie 8')>-1) {
				this.browser.ie = true;
				this.browser.iemin = true;
				this.browser.name = 'ie8';
			}

			if (navigator.userAgent.toLowerCase().indexOf('msie 7')>-1) {
				this.browser.ie = true;
				this.browser.iemin = true;
				this.browser.name = 'ie7';
				this.browser.ie7 = true;
			}
		}.bind(this))(navigator);

		if (this.browser.opera || this.browser.ie7) {

			jQuery(".id-solomki-monoSpace").css("height", "120px");
		}

		this.startgame = function() {

			this.hand.take(jQuery(".id-solomki-game_start"), true, function() {


			}.bind(this), function() {  this.events.go(); }.bind(this));

		}

		this.initial = function() {

			if (!this.session.initialed) {
				jQuery(".id-solomki-game_rules_btn").click(function() {
					S.readrules();  return false;
				});

				jQuery(".id-solomki-game_start_btn").click(function() {
					S.events.go();  return false;
				});

				jQuery(".id-solomki-ok_btn").click(function() {
					S.goPC(); return false;
				});

				jQuery(".id-solomki-ok_btn").mousedown(function() {
					jQuery(this).css("backgroundPosition", "0 0");
				});

				jQuery(".id-solomki-ok_btn").mouseup(function() {
					jQuery(this).css("backgroundPosition", "0 -83px");
				});

				jQuery(".id-solomki-cansel_btn").click(function() {
					S.ctrlz(); return false;
				});

				jQuery(".cansel_btn").mousedown(function() {
					jQuery(this).css("backgroundPosition", "0 0");
				});

				jQuery(".cansel_btn").mouseup(function() {
					jQuery(this).css("backgroundPosition", "0 -43px");
				});

				jQuery(".id-solomki-refresh_btn").click(function() {
					S.events.go();  return false;
				});

				jQuery(".id-solomki-social_btn1").click(function() {
					S.sendSocial('vk');
				});

				jQuery(".id-solomki-social_btn2").click(function() {
					S.sendSocial('fb');
				});

				jQuery(".id-solomki-social_btn3").click(function() {
					S.sendSocial('ok');
				});

				jQuery(".id-solomki-social_btn4").click(function() {
					S.sendSocial('mail');
				});
				this.session.initialed = true;
			}

			this.hand.hide(function() { this.hand.gohome(500); }.bind(this));
		}

		this.sendSocial = function(social) {
			switch(social) {
				case 'vk':
					window.open("http://vk.com/share.php?url=http://простоквашино.рф/index.php/main/childhood/#solomki&title=Я выиграл у Матроскина в Соломки, '_blank', 'scrollbars=0, resizable=1, menubar=0, left=200, top=200, width=550, height=440, toolbar=0, status=0");

				break;
				case 'fb':
					window.open('http://www.facebook.com/sharer.php?u=http://простоквашино.рф/index.php/main/childhood/#solomki', '_blank', 'scrollbars=0, resizable=1, menubar=0, left=200, top=200, width=550, height=440, toolbar=0, status=0');
				break;
				case 'ok':
					window.open('http://www.odnoklassniki.ru/dk?st.cmd=addShare&st._surl=http://простоквашино.рф/index.php/main/childhood/#solomki', '_blank', 'scrollbars=0, resizable=1, menubar=0, left=200, top=200, width=550, height=440, toolbar=0, status=0');

				break;
				case 'mail':
					window.open('http://connect.mail.ru/share?url=http://простоквашино.рф/index.php/main/childhood/#solomki&title=Я выиграл у Матроскина в Соломки', '_blank', 'scrollbars=0, resizable=1, menubar=0, left=200, top=200, width=550, height=440, toolbar=0, status=0');
				break;
			}
		}

		this.build = function() {
			this.session = {
				almost: 0,
				npc_taked: 0,
				pc_taked: 0,
				PCgonnatake: 0,
				PCmusttake: 0,
				taked: {},
				pcblocked: false,
				icalc: 0
			}

			this.path = null;

			this.turns = [];

			this.R = Raphael("paper-"+this.config.className, parseInt(jQuery(this.options.paper).width()), parseInt(jQuery(this.options.paper).height()));
			this.R.clear();

			this.pathshadows = new R_SVG({fixedstroke: false, fixedfill: '#272016', pathprefix: 'spath'});
			this.pathshadows.get(this.R, 'solomkigame/SVG/solomkishadow.svg', function() {

				this.setshadows();
				this.path = new R_SVG({fixedstroke: false, pathprefix: 'path'});
				this.path.get(this.R, 'solomkigame/SVG/solomki.svg', function() {
					this.setevents();
					this.goNPC();
				}.bind(this));
			}.bind(this));


		}

		this.setshadows = function() {
			var i = 0;
			this.session.icalc = 0;
			this.session.module = 15;
			this.session.rotate = [];
			for (var ps in this.pathshadows.items) {

				(function(st, ps, master, i) {

					master.session.icalc+=master.session.module;

					if (master.session.icalc==90) master.session.module=-15;
					if (master.session.icalc==0) master.session.module=15;

					if (!master.browser.ie) st.blur(2);
					if (master.browser.ie) st.animate({translation: '4 2'});
					else st.animate({translation: '2 0'});
					var rotate = ((master.session.icalc*2)*Math.random())-master.session.icalc;
					master.session.rotate[i] = rotate;

					if (!master.browser.ie) st.rotate(rotate);

				})(this.pathshadows.items[ps], ps, this, i);
				i++;
			}
		}

		this.setevents = function() {
			var i = 0;
			this.session.module = 15;

			for (var state in this.path.items) {
				this.session.almost++;

				(function(st, state, master, i) {
					//st.blur(4)
					var color = master.options.colors[(Math.round((master.options.colors.length-2)*Math.random())+1)];
					if (!master.browser.ie) st.rotate(master.session.rotate[i]);
					//color[0] = Math.round(Math.abs(master.session.rotate[i]));

					st.attr("fill", color.join("-"));

					st[0].style.cursor = 'pointer';

					master.session.taked[state] = false;
					st.click(mrls12.pro.call(function(st, master, e) {

						if (master.session.pcblocked) return false;
						master.takeSolomka(1, st, state);

					}, st, master));


				})(this.path.items[state], state, this, i);
				i++;
			}

		}

		this.ctrlz = function() {
			if (this.session.npc_taked<1) {
				alert('Возьмите хотя бы одну соломинку');
				return false;
			}
			this.history[this.session.npc_taked-1].st.animate({translation: '0 -1000'}, 500);
			this.pathshadows.items['s'+this.history[this.session.npc_taked-1].key].animate({translation: '0 -1000'}, 500);
			this.session.almost++;
			this.session.npc_taked--;
			this.displayCount();
		}

		this.takeSolomka = function(taker, st, key) {
			if (taker==1) {
				if (this.session.npc_taked>=3) {
					alert('Вы не можете взять больше 3-х соломинок');
					return false;
				}



			}

			this.history[this.session.npc_taked] = {st: st, key: key};

			this.session.almost--;

			this.session.taked[key] = true;



			if (taker==1) {

				st.animate({translation: '0 1000'}, 950);
				this.pathshadows.items['s'+key].animate({translation: '0 1000'}, 950);
				this.ShowNPCBar();

				if (this.session.almost==0) {
					this.events.youlose();

					return false;
				}
				this.session.npc_taked++;
				if (this.session.npc_taked>0) {
					jQuery(".id-solomki-cansel_btn").show();
				}
				this.displayCount();

				//if (this.session.npc_taked>=3) this.goPC();
				return;
			}
			if (taker==0) {


				this.hand.take(st[0], false, function(st, key) { st.animate({translation: '0 750'}, 1200); this.pathshadows.items['s'+key].animate({translation: '0 750'}, 1200); }.bind(this, st, key));
				this.session.PCmusttake--;
				if (this.session.almost==0) {
					setTimeout(function() { this.events.youwin(); }.bind(this), 1000);
					return false;
				}
				if (this.session.almost==1) {
					this.waitforlasttake = setTimeout(function() { this.waitforlasttake = false; this.events.youlose(); }.bind(this), 2500);

				}
				if (this.session.PCmusttake==0) setTimeout(function() { this.goNPC() }.bind(this), 1200);
				return;
			}

		}

		this.goPC = function() {

			if (this.session.npc_taked==0) {
				alert('Вы должны взять хотя бы одну палочку'); return;
			}
			// блокируем пользователя
			this.session.pcblocked = true;
			this.session.npc_taked = 0;
			this.ShowPCBar();
			this.speak('<i>М</i>оя очередь');
			// > Думаем как обыграть игрока (у него должно остаться 5)
			var calcalmost = this.session.almost-1;
			if ((calcalmost%4)==0) calcalmost--;



			var minus = this.session.almost - ((Math.floor(calcalmost/4)*4 )+1);
			if (minus>3) minus = Math.ceil(3*Math.random());

			this.session.PCgonnatake = minus;
			this.session.PCmusttake = minus;

			for (state in this.path.items) {

				(function(st, state, master) {
					if (master.session.taked[state]!=true && (master.session.PCgonnatake>0)) {

						master.session.PCgonnatake--;
						master.turns.push({st:st, state:state});


					}
				})(this.path.items[state], state, this);

			}
			this.PCdogame(minus);

		}

		this.goNPC = function() {
			jQuery(".id-solomki-cansel_btn").hide();
			this.ShowNPCBar();
			this.displayCount();

			// разблокируем пользователя
			this.session.pcblocked = false;

			if (this.session.almost==1) {

			} else if (this.session.almost==5) {
				this.speak('<i>Т</i>вой ход!');
			} else {
				this.speak('<i>Т</i>вой ход!');
			}

		}

		this.PCdogame = function(minus) {
			var time = 1500;
			// Диалог
			if (this.session.almost==1) {
				setTimeout(function(minus) {  }.bind(this, minus), time);
			} else if (this.session.almost==5) {
				setTimeout(function(minus) { this.speak('<i>Х</i>м… Возьму-ка я <i>'+minus+'</i> '+((minus==1) ? 'соломку' : 'соломки')); }.bind(this, minus), time);
			} else if (this.session.almost<5) {
				setTimeout(function(minus) { this.speak('<i>Х</i>м… Возьму-ка я <i>'+minus+'</i> '+((minus==1) ? 'соломку' : 'соломки')); }.bind(this, minus), time);
			} else if (((this.session.almost-1)%4)==0) {
				setTimeout(function(minus) { this.speak('<i>Х</i>м… Возьму-ка я <i>'+minus+'</i> '+((minus==1) ? 'соломку' : 'соломки')); }.bind(this, minus), time);
			} else {
				setTimeout(function(minus) { this.speak('<i>Х</i>м… Возьму-ка я <i>'+minus+'</i> '+((minus==1) ? 'соломку' : 'соломки')); }.bind(this, minus), time);
			}

			for (key in this.turns) {
				 time+=1000;
				setTimeout(function(st, state) { this.takeSolomka(0, st, state); }.bind(this, this.turns[key].st, this.turns[key].state), time);
			}
			this.turns = [];
		}



		this.speak = function(txt) {

			if (jQuery(".id-solomki-monolog").is(':visible')) {
				jQuery(".id-solomki-monologWrapper span").stop().animate({opacity: 0}, 500, function(txt) {
					if (this.browser.ie7) {

						jQuery(".id-solomki-monologWrapper span").html('<table cellpadding="0" cellspacing="0" border="0" class="full"><tbody><tr><td valign="center">'+txt+'</td></tr></tbody></table>');
					} else {
						jQuery(".id-solomki-monologWrapper span").html(txt);
					}
					jQuery(".id-solomki-monologWrapper span").stop().animate({opacity: 1}, 500);
				}.bind(this, txt));
				var time = Math.round(((4000/45)*txt.length)+1000);
			} else {
				var time = Math.round((4000/45)*txt.length);
				if (this.browser.ie7) {

						jQuery(".id-solomki-monologWrapper span").html('<table cellpadding="0" cellspacing="0" border="0" class="full"><tbody><tr><td valign="center">'+txt+'</td></tr></tbody></table>');
					} else {
						jQuery(".id-solomki-monologWrapper span").html(txt);
					}
			}



			if (this.session.speaktimer!=false) clearTimeout(this.session.speaktimer);
			this.session.speaktimer = setTimeout(function() {

				this.session.speaktimer = false;
				jQuery(".id-solomki-monologWrapper span").stop().animate({opacity: 0}, 500, function() {
					jQuery(".id-solomki-monolog").stop().animate({opacity: 0}, 250, function() {
							jQuery(".id-solomki-monolog").css("display", "none");
					}.bind(this));
				}.bind(this));
			}.bind(this), time);

			if (!jQuery(".id-solomki-monolog").is(':visible')) {
				jQuery(".id-solomki-monolog").css("display", "block");
				jQuery(".id-solomki-monolog").stop().animate({opacity: 1}, 500, function() {
					jQuery(".id-solomki-monologWrapper span").stop().animate({opacity: 1}, 500);
				}.bind(this));
			} else {
				jQuery(".id-solomki-monolog").stop();

				jQuery(".id-solomki-monolog").css("display", "block");
				jQuery(".id-solomki-monolog").css("opacity", "1");

			}


		}

		this.hidemonolog = function() {
			jQuery(".id-solomki-monologWrapper span").stop().animate({opacity: 0}, 500, function() {
				jQuery(".id-solomki-monolog").stop().animate({opacity: 0}, 250, function() {
						jQuery(".id-solomki-monolog").css("display", "none");
				}.bind(this));
			}.bind(this));
		}

		this.ShowPCBar = function() {
			jQuery(".game_pc").show();
			jQuery(".game_npc").hide();
		}

		this.ShowNPCBar = function() {
			jQuery(".game_npc").show();
			jQuery(".game_pc").hide();
		}

		this.displayCount = function() {
			jQuery(".id-solomki-game_counter").html(this.session.npc_taked);
		}

		this.readrules = function() {

			this.events.restarter('readrules');

		}

		// > ANIMATION
		this.events = {
			master: this,
			go: function() { // < Скрывает все стартовые изображения
				if (this.master.session.firststart) {
					this.master.session.firststart = false;
				} else {

				}

				this.play();
			},
			play: function() {

				jQuery(".game_start").hide();
				jQuery(".game_process").show();
				jQuery(".id-solomki-paper").show();
				this.master.build()
				this.master.ShowNPCBar();
			},
			youlose: function() {
				if (this.master.waitforlasttake) clearTimeout(this.master.waitforlasttake);
				setTimeout(function() {
					//this.master.speak('<i>В</i>ы проиграли! Желаете сыграть ещё разок? <br /><a href="" onClick="S.events.go();return false;">Начать игру</a>');
					this.restarter("lost");
				}.bind(this), 750);
			},
			youwin: function() {

				setTimeout(function() {
					//this.master.speak('<i>А</i>х, черт. Ну давай ещё разок сыграем! <br /><a href="" onClick="S.events.go();return false;">Начать игру</a>');
					this.restarter("win");

				}.bind(this), 750);
			},
			restarter: function(status) {
				jQuery(".id-solomki-game_restarter").show();
				jQuery(".id-solomki-paper").hide();
				switch(status) {
					case 'lost':
						jQuery(".game_process").hide();
						jQuery(".game_title").hide();
						jQuery(".id-solomki-game_title_lost").show();
						jQuery(".id-solomki-repeatDialog").show();
					break;
					case 'win':
						jQuery(".game_process").hide();
						jQuery(".game_title").hide();
						jQuery(".id-solomki-game_title_win").show();
						jQuery(".id-solomki-game_social").show();
					break;
					case 'intro':
						jQuery(".game_title").hide();
						jQuery(".id-solomki-game_title").show();
					break;
					case 'readrules':
						this.master.hidemonolog();
						this.master.hand.shift(function() { });
						jQuery(".id-solomki-game_start").css('bottom', '250px');
						jQuery(".id-solomki-game_start").show();
						jQuery(".id-solomki-game_start").stop().animate({top: 150}, 500);

					break;
				}
			}
		}

		// > HAND
		this.hand = {
			master: this,
			take: function(target, automove, funcobj, funcafter) {
				if (funcafter==undefined) funcafter = function() {  };
				var pos = jQuery(target).offset();

				pos.left -= 300;

				this.moveto(pos.left, pos.top+40, 600, function(target, pos, funcobj, funcafter, automove) {
					if (automove) jQuery(target).stop().animate({top: pos.top+750+'px'}, 1200);
					funcobj();
					this.moveto(pos.left, pos.top+750, 1200, function(funcafter) {

						funcafter();
						this.gohome(500, function() {  });
					}.bind(this, funcafter));

				}.bind(this, target, pos, funcobj, funcafter, automove));
			},
			moveto: function(x, y, time, func) {
				jQuery(".id-solomki-hand").stop().animate({
					top: parseInt(y)+'px',
					left: parseInt(x)+'px'
				}, time, func);
			},
			hide: function(func) {
					if (func==undefined) func = function() {  };

					jQuery(".id-solomki-hand").stop().animate({
						top: jQuery("body").height(),
						left: '30px'
					}, 500, func);
			},
			shift: function(func) {
					if (func==undefined) func = function() {  };

					jQuery(".id-solomki-hand").stop().animate({
						top: (parseInt(jQuery("body").height())-100)+'px',
						left: '-150px'
					}, 500, func);
			},
			gohome: function(time, func) {
					if (func==undefined) func = function() {  };
					jQuery(".id-solomki-hand").show();
					jQuery(".id-solomki-hand").stop().animate({
						top: (parseInt(jQuery(".id-solomki-game_actions").position().top)+parseInt(jQuery(".id-solomki-game_actions").height())-400)+'px',
						left: '30px'
					}, time, func);

			}
		}


	}
}
