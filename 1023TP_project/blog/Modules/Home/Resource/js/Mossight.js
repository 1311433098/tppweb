jQuery.cookie = function(b, j, m) {
	if (typeof j != "undefined") {
		m = m || {};
		if (j === null) {
			j = "";
			m.expires = -1
		}
		var e = "";
		if (m.expires && (typeof m.expires == "number" || m.expires.toUTCString)) {
			var f;
			if (typeof m.expires == "number") {
				f = new Date();
				f.setTime(f.getTime() + (m.expires * 24 * 60 * 60 * 1000))
			} else {
				f = m.expires
			}
			e = "; expires=" + f.toUTCString()
		}
		var l = m.path ? "; path=" + (m.path) : "";
		var g = m.domain ? "; domain=" + (m.domain) : "";
		var a = m.secure ? "; secure" : "";
		document.cookie = [b, "=", encodeURIComponent(j), e, l, g, a].join("")
	} else {
		var d = null;
		if (document.cookie && document.cookie != "") {
			var k = document.cookie.split(";");
			for (var h = 0; h < k.length; h++) {
				var c = jQuery.trim(k[h]);
				if (c.substring(0, b.length + 1) == (b + "=")) {
					d = decodeURIComponent(c.substring(b.length + 1));
					break
				}
			}
		}
		return d
	}
};
(function($){
	$.fn.colorTip = function(settings) {
		var defaultSettings = {
			color: 'red',
			timeout: 25
		};
		var supportedColors = ['red'];
		settings = $.extend(defaultSettings, settings);
		return this.each(function() {
			var elem = $(this);
			if (!elem.attr('title')) return true;
			var scheduleEvent = new eventScheduler();
			var title = elem.attr('title'),
				tip = new Tip(title);
			elem.append(tip.generate()).addClass('colorTipContainer');
			var hasClass = false;
			for (var i = 0; i < supportedColors.length; i++) {
				if (elem.hasClass(supportedColors[i])) {
					hasClass = true;
					break;
				}
			}
			if (!hasClass) {
				elem.addClass(settings.color);
			}
			elem.hover(function() {
				elem.removeAttr('title');
				tip.show();
				scheduleEvent.clear();
			}, function() {
				scheduleEvent.set(function() {
					tip.hide();
					elem.attr('title', title);
				}, settings.timeout);
			});
		});
	};

	function eventScheduler() {}
	eventScheduler.prototype = {
		set: function(func, timeout) {
			this.timer = setTimeout(func, timeout);
		},
		clear: function() {
			clearTimeout(this.timer);
		}
	};

	function Tip(txt) {
		this.content = txt;
		this.shown = false;
	}
	Tip.prototype = {
		generate: function() {
			return this.tip || (this.tip = $('<span class="colorTip">' + this.content + '<span class="pointyTipShadow"></span><span class="pointyTip"></span></span>'));
		},
		show: function() {
			if (this.shown) return;
			this.tip.css('margin-left', -this.tip.outerWidth() / 2).fadeIn(150);
			this.shown = true;
		},
		hide: function() {
			this.tip.fadeOut(220);
			this.shown = false;
		}
	};

})(jQuery);
$(document).ready(function() {
	var blurtext = function(a){
		var _this = a,
			label = _this.prev();
		if(_this.val()!="") label.hide();
	};
	blurtext($('#author'));
	blurtext($('#email'));
	blurtext($('#url'));
	blurtext($('#comment'));
	$('#author,#email,#url,#comment').bind({
		focus:function(){
			var _this = $(this),
				label = _this.prev();
			label.hide();
		},
		blur:function(){
			var _this = $(this),
				label = _this.prev();
			_this.val()=="" ? label.show() : label.hide();
		}
	});
	if($('#sidebar_body_2').children('div').length<1) $('#sidebar2').hide();
	if($('.container').height() > $('#sidebar').height()){
		var $stick = $('#sidebar2_inner');
		if($stick.length>0){
			var	theWindow = $(window),
				oldTop = $stick.offset().top,
				T = $('.footerwrap').offset().top - 90 - theWindow.height(),
				HH = theWindow.height() - $('#sidebar2_inner').height() - $('.footerwrap').height();
				
			theWindow.scroll(function() {
				var p = $('#topbar').css('position'),
					t = p=='fixed' ? 70:20,
					top = theWindow.scrollTop()+ t;	
				if (top > oldTop) {
					var k = (HH < 0 && top > T)? (HH-90) : t;
					
					$stick.css({
						position: 'fixed',
						top: k
					});
				}else if (top < oldTop) {
					$stick.css({
						position: 'relative',
						top: ''
					})
				}
			});	
		}
	}
	jQuery(".wall img").hover(function() {
		jQuery(this).stop(true).parents("li").addClass("zin").end().animate({
			left: -16,
			top: -15,
			width: 72,
			height: 72
		}, 200)
	}, function() {
		jQuery(this).stop(true).parents("li").removeClass("zin").end().animate({
			left: 0,
			top: 0,
			width: 40,
			height: 40
		}, 200)
	});
	if($(".sns a").length>0) $(".sns a").colorTip({});
	$("#nav ul").css({
		display: "none"
	});
	$("#nav li").hover(function() {
		$(this).find('ul:first').css({
			display: "none"
		}).filter(":not(:animated)").animate({
			opacity: "show",
			height: "show"
		}, "fast ")
	}, function() {
		$(this).find('ul:first').animate({
			opacity: "hide",
			height: "hide"
		}, "100")
	});
	var img_cont = ($('.defaultpost').find('img')).length;
	if (img_cont != 0) {
		var maxwidth = 614;
		var maxwidth_value = maxwidth + 'px';
		for (var i = 0; i <= img_cont - 1; i++) {
			var max_width = $('.defaultpost img:eq(' + i + ')');
			if (max_width.width() > maxwidth) {
				max_width.addClass('max_width_img').removeAttr("width").removeAttr("height").css({
					"cursor": "pointer",
					"width": maxwidth_value,
					"height": "auto"
				})
			}
		}
	};
	$('.report, .report1').click(function() {
		$body.animate({
			scrollTop: $('#comment').offset().top
		}, 400)
	});
	$(".reply").click(function() {
		var b = '"#' + $(this).parent().parent().parent().parent().parent().attr("id") + '"',
			c = $(this).parent().parent().find(".commentid").text();
		$("#comment").attr("value", "<a href=" + b + ">@" + c + "</a>: ").focus()
	}), $("#cancel_comment_reply").click(function() {
		$("#comment").attr("value", "")
	});
	$(".commentlist .avatar").wrap("<div class='avatar-wrap' />");
	$('.formatcat a, .post_meta_comments a, .cat-item a, .statusavatar a, ul.recentcomments li a, ul.linktworow li a, a.musiclink, .sidsns a').each(function(i) {
		if (this.title) {
			var imgTitle = this.title;
			var x = 30;
			$(this).mouseover(function(e) {
				this.title = '';
				$('body').append('<div id="tooltip">' + imgTitle + '</div>');
				$('#tooltip').css({
					'left': (e.pageX + x) + 'px',
					'top': e.pageY + 'px'
				}).fadeIn(500)
			}).mouseout(function() {
				this.title = imgTitle;
				$('#tooltip').remove()
			}).mousemove(function(e) {
				$('#tooltip').css({
					'left': (e.pageX + x) + 'px',
					'top': e.pageY + 'px'
				})
			})
		}
	});
	$(".pingpart").click(function() {
		$(this).css({
			color: "#b3b3b3"
		});
		$(".commentshow").hide(400);
		$(".pingtlist").show(400);
		$(".commentpart").css({
			color: "#CECECE"
		})
	});
	$(".commentpart").click(function() {
		$(this).css({
			color: "#b3b3b3"
		});
		$(".pingtlist").hide(400);
		$(".commentshow").show(400);
		$(".pingpart").css({
			color: "#CECECE"
		})
	});
		$(".toggle_content").hide();
		$(".toggle_title").click(function() {
			$(this).toggleClass("active").next().slideToggle('fast');
			return false
		});
		$('.content_post a img').hover(function() {
			jQuery(this).stop().animate({
				opacity: 0.5
			}, 400)
		}, function() {
			jQuery(this).stop().animate({
				opacity: 1
			}, 400)
		});
	var ie8checking = function() {
		if (jQuery.browser.msie && parseInt(jQuery.browser.version) <= 8) {
			return true
		}
		return false
	},
	muzzzsns = jQuery.cookie('muzzzsns');
	jQuery(".close").click(function() {
		jQuery.cookie('muzzzsns', 'close');
		if (ie8checking()) {
			jQuery('.snspart').hide()
		} else {
			jQuery('.snspart').fadeOut(600)
		}
	});
	jQuery(".box").click(function() {
		jQuery.cookie('muzzzsns', 'open');
		if (ie8checking()) {
			jQuery('.snspart').show()
		} else {
			jQuery('.snspart').delay(300).fadeIn(500)
		}
	});
});
jQuery(document).ready(function(a) {
	a("#linkcontent .linkfav h3 ").click(function() {
		a(this).next().slideToggle(500)
	})
}), function(a) {
	a.fn.tipTip = function(b) {
		var c = {
			activation: "hover",
			keepAlive: !1,
			maxWidth: "200px",
			edgeOffset: 3,
			defaultPosition: "bottom",
			delay: 400,
			fadeIn: 400,
			fadeOut: 300,
			attribute: "title",
			content: !1,
			enter: function() {},
			exit: function() {}
		},
			d = a.extend(c, b);
		if (a("#tiptip_holder").length <= 0) {
			var e = a('<div id="tiptip_holder" style="max-width:' + d.maxWidth + ';"></div>'),
				f = a('<div id="tiptip_content"></div>'),
				g = a('<div id="tiptip_arrow"></div>');
			a("body").append(e.html(f).prepend(g.html('<div id="tiptip_arrow_inner"></div>')))
		} else var e = a("#tiptip_holder"),
			f = a("#tiptip_content"),
			g = a("#tiptip_arrow");
		return this.each(function() {
			var b = a(this);
			if (d.content) var c = d.content;
			else var c = b.attr(d.attribute);
			if (c != "") {
				d.content || b.removeAttr(d.attribute);
				var h = !1;
				d.activation == "hover" ? (b.hover(function() {
					i()
				}, function() {
					d.keepAlive || j()
				}), d.keepAlive && e.hover(function() {}, function() {
					j()
				})) : d.activation == "focus" ? b.focus(function() {
					i()
				}).blur(function() {
					j()
				}) : d.activation == "click" && (b.click(function() {
					return i(), !1
				}).hover(function() {}, function() {
					d.keepAlive || j()
				}), d.keepAlive && e.hover(function() {}, function() {
					j()
				}));

				function i() {
					d.enter.call(this), f.html(c), e.hide().removeAttr("class").css("margin", "0"), g.removeAttr("style");
					var i = parseInt(b.offset().top),
						j = parseInt(b.offset().left),
						k = parseInt(b.outerWidth()),
						m = parseInt(b.outerHeight()),
						n = e.outerWidth(),
						o = e.outerHeight(),
						p = Math.round((k - n) / 2),
						q = Math.round((m - o) / 2),
						r = Math.round(j + p),
						s = Math.round(i + m + d.edgeOffset),
						t = "",
						u = "",
						v = Math.round(n - 12) / 2;
					d.defaultPosition == "bottom" ? t = "_bottom" : d.defaultPosition == "top" ? t = "_top" : d.defaultPosition == "left" ? t = "_left" : d.defaultPosition == "right" && (t = "_right");
					var w = p + j < parseInt(a(window).scrollLeft()),
						x = n + j > parseInt(a(window).width());
					if (w && p < 0 || t == "_right" && !x || t == "_left" && j < n + d.edgeOffset + 5) t = "_right", u = Math.round(o - 13) / 2, v = -12, r = Math.round(j + k + d.edgeOffset), s = Math.round(i + q);
					else if (x && p < 0 || t == "_left" && !w) t = "_left", u = Math.round(o - 13) / 2, v = Math.round(n), r = Math.round(j - (n + d.edgeOffset + 5)), s = Math.round(i + q);
					var y = i + m + d.edgeOffset + o + 8 > parseInt(a(window).height() + a(window).scrollTop()),
						z = i + m - (d.edgeOffset + o + 8) < 0;
					if (y || t == "_bottom" && y || t == "_top" && !z) t == "_top" || t == "_bottom" ? t = "_top" : t += "_top", u = o, s = Math.round(i - (o + 5 + d.edgeOffset));
					else if (z | (t == "_top" && z) || t == "_bottom" && !y) t == "_top" || t == "_bottom" ? t = "_bottom" : t += "_bottom", u = -12, s = Math.round(i + m + d.edgeOffset);
					if (t == "_right_top" || t == "_left_top") s += 5;
					else if (t == "_right_bottom" || t == "_left_bottom") s -= 5;
					if (t == "_left_top" || t == "_left_bottom") r += 5;
					g.css({
						"margin-left": v + "px",
						"margin-top": u + "px"
					}), e.css({
						"margin-left": r + "px",
						"margin-top": s + "px"
					}).attr("class", "tip" + t), h && clearTimeout(h), h = setTimeout(function() {
						e.stop(!0, !0).fadeIn(d.fadeIn)
					}, d.delay)
				}
				function j() {
					d.exit.call(this), h && clearTimeout(h), e.fadeOut(d.fadeOut)
				}
			}
		})
	}
}(jQuery), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
	def: "easeOutQuad",
	swing: function(a, b, c, d, e) {
		return jQuery.easing[jQuery.easing.def](a, b, c, d, e)
	},
	easeInQuad: function(a, b, c, d, e) {
		return d * (b /= e) * b + c
	},
	easeOutQuad: function(a, b, c, d, e) {
		return -d * (b /= e) * (b - 2) + c
	},
	easeInOutQuad: function(a, b, c, d, e) {
		return (b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
	},
	easeInCubic: function(a, b, c, d, e) {
		return d * (b /= e) * b * b + c
	},
	easeOutCubic: function(a, b, c, d, e) {
		return d * ((b = b / e - 1) * b * b + 1) + c
	},
	easeInOutCubic: function(a, b, c, d, e) {
		return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c
	},
	easeInQuart: function(a, b, c, d, e) {
		return d * (b /= e) * b * b * b + c
	},
	easeOutQuart: function(a, b, c, d, e) {
		return -d * ((b = b / e - 1) * b * b * b - 1) + c
	},
	easeInOutQuart: function(a, b, c, d, e) {
		return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c
	},
	easeInQuint: function(a, b, c, d, e) {
		return d * (b /= e) * b * b * b * b + c
	},
	easeOutQuint: function(a, b, c, d, e) {
		return d * ((b = b / e - 1) * b * b * b * b + 1) + c
	},
	easeInOutQuint: function(a, b, c, d, e) {
		return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c
	},
	easeInSine: function(a, b, c, d, e) {
		return -d * Math.cos(b / e * (Math.PI / 2)) + d + c
	},
	easeOutSine: function(a, b, c, d, e) {
		return d * Math.sin(b / e * (Math.PI / 2)) + c
	},
	easeInOutSine: function(a, b, c, d, e) {
		return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
	},
	easeInExpo: function(a, b, c, d, e) {
		return b == 0 ? c : d * Math.pow(2, 10 * (b / e - 1)) + c
	},
	easeOutExpo: function(a, b, c, d, e) {
		return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c
	},
	easeInOutExpo: function(a, b, c, d, e) {
		return b == 0 ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (-Math.pow(2, -10 * --b) + 2) + c
	},
	easeInCirc: function(a, b, c, d, e) {
		return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c
	},
	easeOutCirc: function(a, b, c, d, e) {
		return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
	},
	easeInOutCirc: function(a, b, c, d, e) {
		return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c
	},
	easeInElastic: function(a, b, c, d, e) {
		var f = 1.70158,
			g = 0,
			h = d;
		if (b == 0) return c;
		if ((b /= e) == 1) return c + d;
		g || (g = e * .3);
		if (h < Math.abs(d)) {
			h = d;
			var f = g / 4
		} else var f = g / (2 * Math.PI) * Math.asin(d / h);
		return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g)) + c
	},
	easeOutElastic: function(a, b, c, d, e) {
		var f = 1.70158,
			g = 0,
			h = d;
		if (b == 0) return c;
		if ((b /= e) == 1) return c + d;
		g || (g = e * .3);
		if (h < Math.abs(d)) {
			h = d;
			var f = g / 4
		} else var f = g / (2 * Math.PI) * Math.asin(d / h);
		return h * Math.pow(2, -10 * b) * Math.sin((b * e - f) * 2 * Math.PI / g) + d + c
	},
	easeInOutElastic: function(a, b, c, d, e) {
		var f = 1.70158,
			g = 0,
			h = d;
		if (b == 0) return c;
		if ((b /= e / 2) == 2) return c + d;
		g || (g = e * .3 * 1.5);
		if (h < Math.abs(d)) {
			h = d;
			var f = g / 4
		} else var f = g / (2 * Math.PI) * Math.asin(d / h);
		return b < 1 ? -0.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) + c : h * Math.pow(2, -10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) * .5 + d + c
	},
	easeInBack: function(a, b, c, d, e, f) {
		return f == undefined && (f = 1.70158), d * (b /= e) * b * ((f + 1) * b - f) + c
	},
	easeOutBack: function(a, b, c, d, e, f) {
		return f == undefined && (f = 1.70158), d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c
	},
	easeInOutBack: function(a, b, c, d, e, f) {
		return f == undefined && (f = 1.70158), (b /= e / 2) < 1 ? d / 2 * b * b * (((f *= 1.525) + 1) * b - f) + c : d / 2 * ((b -= 2) * b * (((f *= 1.525) + 1) * b + f) + 2) + c
	},
	easeInBounce: function(a, b, c, d, e) {
		return d - jQuery.easing.easeOutBounce(a, e - b, 0, d, e) + c
	},
	easeOutBounce: function(a, b, c, d, e) {
		return (b /= e) < 1 / 2.75 ? d * 7.5625 * b * b + c : b < 2 / 2.75 ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : b < 2.5 / 2.75 ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
	},
	easeInOutBounce: function(a, b, c, d, e) {
		return b < e / 2 ? jQuery.easing.easeInBounce(a, b * 2, 0, d, e) * .5 + c : jQuery.easing.easeOutBounce(a, b * 2 - e, 0, d, e) * .5 + d * .5 + c
	}
}), function(a, b, c) {
	function d(c, d, e) {
		var f = b.createElement(c);
		return d && (f.id = p + d), e && (f.style.cssText = e), a(f)
	}
	function e(a) {
		var b = I.length,
			c = ($ + a) % b;
		return c < 0 ? b + c : c
	}
	function f(a, b) {
		return Math.round((/%/.test(a) ? (b === "x" ? J.width() : J.height()) / 100 : 1) * parseInt(a, 10))
	}
	function g(a) {
		return U.photo || /\.(gif|png|jpe?g|bmp|ico)((#|\?).*)?$/i.test(a)
	}
	function h() {
		var b;
		U = a.extend({}, a.data(Z, o));
		for (b in U) a.isFunction(U[b]) && b.slice(0, 2) !== "on" && (U[b] = U[b].call(Z));
		U.rel = U.rel || Z.rel || "nofollow", U.href = U.href || a(Z).attr("href"), U.title = U.title || Z.title, typeof U.href == "string" && (U.href = a.trim(U.href))
	}
	function i(b, c) {
		a.event.trigger(b), c && c.call(Z)
	}
	function j() {
		var a, b = p + "Slideshow_",
			c = "click." + p,
			d, e, f;
		U.slideshow && I[1] ? (d = function() {
			P.text(U.slideshowStop).unbind(c).bind(t, function() {
				if (U.loop || I[$ + 1]) a = setTimeout(be.next, U.slideshowSpeed)
			}).bind(s, function() {
				clearTimeout(a)
			}).one(c + " " + u, e), B.removeClass(b + "off").addClass(b + "on"), a = setTimeout(be.next, U.slideshowSpeed)
		}, e = function() {
			clearTimeout(a), P.text(U.slideshowStart).unbind([t, s, u, c].join(" ")).one(c, function() {
				be.next(), d()
			}), B.removeClass(b + "on").addClass(b + "off")
		}, U.slideshowAuto ? d() : e()) : B.removeClass(b + "off " + b + "on")
	}
	function k(b) {
		bc || (Z = b, h(), I = a(Z), $ = 0, U.rel !== "nofollow" && (I = a("." + q).filter(function() {
			var b = a.data(this, o).rel || this.rel;
			return b === U.rel
		}), $ = I.index(Z), $ === -1 && (I = I.add(Z), $ = I.length - 1)), ba || (ba = bb = !0, B.show(), U.returnFocus && a(Z).blur().one(v, function() {
			a(this).focus()
		}), A.css({
			opacity: +U.opacity,
			cursor: U.overlayClose ? "pointer" : "auto"
		}).show(), U.w = f(U.initialWidth, "x"), U.h = f(U.initialHeight, "y"), be.position(), y && J.bind("resize." + z + " scroll." + z, function() {
			A.css({
				width: J.width(),
				height: J.height(),
				top: J.scrollTop(),
				left: J.scrollLeft()
			})
		}).trigger("resize." + z), i(r, U.onOpen), T.add(N).hide(), S.html(U.close).show()), be.load(!0))
	}
	function l() {
		!B && b.body && (bg = !1, J = a(c), B = d(bf).attr({
			id: o,
			"class": x ? p + (y ? "IE6" : "IE") : ""
		}).hide(), A = d(bf, "Overlay", y ? "position:absolute" : "").hide(), C = d(bf, "Wrapper"), D = d(bf, "Content").append(K = d(bf, "LoadedContent", "width:0; height:0; overflow:hidden"), M = d(bf, "LoadingOverlay").add(d(bf, "LoadingGraphic")), N = d(bf, "Title"), O = d(bf, "Current"), Q = d(bf, "Next"), R = d(bf, "Previous"), P = d(bf, "Slideshow").bind(r, j), S = d(bf, "Close")), C.append(d(bf).append(d(bf, "TopLeft"), E = d(bf, "TopCenter"), d(bf, "TopRight")), d(bf, !1, "clear:left").append(F = d(bf, "MiddleLeft"), D, G = d(bf, "MiddleRight")), d(bf, !1, "clear:left").append(d(bf, "BottomLeft"), H = d(bf, "BottomCenter"), d(bf, "BottomRight"))).find("div div").css({
			"float": "left"
		}), L = d(bf, !1, "position:absolute; width:9999px; visibility:hidden; display:none"), T = Q.add(R).add(O).add(P), a(b.body).append(A, B.append(C, L)))
	}
	function m() {
		return B ? (bg || (bg = !0, V = E.height() + H.height() + D.outerHeight(!0) - D.height(), W = F.width() + G.width() + D.outerWidth(!0) - D.width(), X = K.outerHeight(!0), Y = K.outerWidth(!0), B.css({
			"padding-bottom": V,
			"padding-right": W
		}), Q.click(function() {
			be.next()
		}), R.click(function() {
			be.prev()
		}), S.click(function() {
			be.close()
		}), A.click(function() {
			U.overlayClose && be.close()
		}), a(b).bind("keydown." + p, function(a) {
			var b = a.keyCode;
			ba && U.escKey && b === 27 && (a.preventDefault(), be.close()), ba && U.arrowKey && I[1] && (b === 37 ? (a.preventDefault(), R.click()) : b === 39 && (a.preventDefault(), Q.click()))
		}), a("." + q, b).live("click", function(a) {
			a.which > 1 || a.shiftKey || a.altKey || a.metaKey || (a.preventDefault(), k(this))
		})), !0) : !1
	}
	var n = {
		transition: "elastic",
		speed: 300,
		width: !1,
		initialWidth: "600",
		innerWidth: !1,
		maxWidth: !1,
		height: !1,
		initialHeight: "450",
		innerHeight: !1,
		maxHeight: !1,
		scalePhotos: !0,
		scrolling: !0,
		inline: !1,
		html: !1,
		iframe: !1,
		fastIframe: !0,
		photo: !1,
		href: !1,
		title: !1,
		rel: !1,
		opacity: .9,
		preloading: !0,
		current: "image {current} of {total}",
		previous: "previous",
		next: "next",
		close: "close",
		open: !1,
		returnFocus: !0,
		reposition: !0,
		loop: !0,
		slideshow: !1,
		slideshowAuto: !0,
		slideshowSpeed: 2500,
		slideshowStart: "start slideshow",
		slideshowStop: "stop slideshow",
		onOpen: !1,
		onLoad: !1,
		onComplete: !1,
		onCleanup: !1,
		onClosed: !1,
		overlayClose: !0,
		escKey: !0,
		arrowKey: !0,
		top: !1,
		bottom: !1,
		left: !1,
		right: !1,
		fixed: !1,
		data: undefined
	},
		o = "colorbox",
		p = "cbox",
		q = p + "Element",
		r = p + "_open",
		s = p + "_load",
		t = p + "_complete",
		u = p + "_cleanup",
		v = p + "_closed",
		w = p + "_purge",
		x = !a.support.opacity && !a.support.style,
		y = x && !c.XMLHttpRequest,
		z = p + "_IE6",
		A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, $, _, ba, bb, bc, bd, be, bf = "div",
		bg;
	if (a.colorbox) return;
	a(l), be = a.fn[o] = a[o] = function(b, c) {
		var d = this;
		b = b || {}, l();
		if (m()) {
			if (!d[0]) {
				if (d.selector) return d;
				d = a("<a/>"), b.open = !0
			}
			c && (b.onComplete = c), d.each(function() {
				a.data(this, o, a.extend({}, a.data(this, o) || n, b))
			}).addClass(q), (a.isFunction(b.open) && b.open.call(d) || b.open) && k(d[0])
		}
		return d
	}, be.position = function(a, b) {
		function c(a) {
			E[0].style.width = H[0].style.width = D[0].style.width = a.style.width, D[0].style.height = F[0].style.height = G[0].style.height = a.style.height
		}
		var d = 0,
			e = 0,
			g = B.offset(),
			h = J.scrollTop(),
			i = J.scrollLeft();
		J.unbind("resize." + p), B.css({
			top: -9e4,
			left: -9e4
		}), U.fixed && !y ? (g.top -= h, g.left -= i, B.css({
			position: "fixed"
		})) : (d = h, e = i, B.css({
			position: "absolute"
		})), U.right !== !1 ? e += Math.max(J.width() - U.w - Y - W - f(U.right, "x"), 0) : U.left !== !1 ? e += f(U.left, "x") : e += Math.round(Math.max(J.width() - U.w - Y - W, 0) / 2), U.bottom !== !1 ? d += Math.max(J.height() - U.h - X - V - f(U.bottom, "y"), 0) : U.top !== !1 ? d += f(U.top, "y") : d += Math.round(Math.max(J.height() - U.h - X - V, 0) / 2), B.css({
			top: g.top,
			left: g.left
		}), a = B.width() === U.w + Y && B.height() === U.h + X ? 0 : a || 0, C[0].style.width = C[0].style.height = "9999px", B.dequeue().animate({
			width: U.w + Y,
			height: U.h + X,
			top: d,
			left: e
		}, {
			duration: a,
			complete: function() {
				c(this), bb = !1, C[0].style.width = U.w + Y + W + "px", C[0].style.height = U.h + X + V + "px", U.reposition && setTimeout(function() {
					J.bind("resize." + p, be.position)
				}, 1), b && b()
			},
			step: function() {
				c(this)
			}
		})
	}, be.resize = function(a) {
		ba && (a = a || {}, a.width && (U.w = f(a.width, "x") - Y - W), a.innerWidth && (U.w = f(a.innerWidth, "x")), K.css({
			width: U.w
		}), a.height && (U.h = f(a.height, "y") - X - V), a.innerHeight && (U.h = f(a.innerHeight, "y")), !a.innerHeight && !a.height && (K.css({
			height: "auto"
		}), U.h = K.height()), K.css({
			height: U.h
		}), be.position(U.transition === "none" ? 0 : U.speed))
	}, be.prep = function(b) {
		function c() {
			return U.w = U.w || K.width(), U.w = U.mw && U.mw < U.w ? U.mw : U.w, U.w
		}
		function f() {
			return U.h = U.h || K.height(), U.h = U.mh && U.mh < U.h ? U.mh : U.h, U.h
		}
		if (!ba) return;
		var h, j = U.transition === "none" ? 0 : U.speed;
		K.remove(), K = d(bf, "LoadedContent").append(b), K.hide().appendTo(L.show()).css({
			width: c(),
			overflow: U.scrolling ? "auto" : "hidden"
		}).css({
			height: f()
		}).prependTo(D), L.hide(), a(_).css({
			"float": "none"
		}), y && a("select").not(B.find("select")).filter(function() {
			return this.style.visibility !== "hidden"
		}).css({
			visibility: "hidden"
		}).one(u, function() {
			this.style.visibility = "inherit"
		}), h = function() {
			function b() {
				x && B[0].style.removeAttribute("filter")
			}
			var c, f, h = I.length,
				k, l = "frameBorder",
				m = "allowTransparency",
				n, q, r;
			if (!ba) return;
			n = function() {
				clearTimeout(bd), M.hide(), i(t, U.onComplete)
			}, x && _ && K.fadeIn(100), N.html(U.title).add(K).show();
			if (h > 1) {
				typeof U.current == "string" && O.html(U.current.replace("{current}", $ + 1).replace("{total}", h)).show(), Q[U.loop || $ < h - 1 ? "show" : "hide"]().html(U.next), R[U.loop || $ ? "show" : "hide"]().html(U.previous), U.slideshow && P.show();
				if (U.preloading) {
					c = [e(-1), e(1)];
					while (f = I[c.pop()]) q = a.data(f, o).href || f.href, a.isFunction(q) && (q = q.call(f)), g(q) && (r = new Image, r.src = q)
				}
			} else T.hide();
			U.iframe ? (k = d("iframe")[0], l in k && (k[l] = 0), m in k && (k[m] = "true"), k.name = p + +(new Date), U.fastIframe ? n() : a(k).one("load", n), k.src = U.href, U.scrolling || (k.scrolling = "no"), a(k).addClass(p + "Iframe").appendTo(K).one(w, function() {
				k.src = "//about:blank"
			})) : n(), U.transition === "fade" ? B.fadeTo(j, 1, b) : b()
		}, U.transition === "fade" ? B.fadeTo(j, 0, function() {
			be.position(0, h)
		}) : be.position(j, h)
	}, be.load = function(b) {
		var c, e, j = be.prep;
		bb = !0, _ = !1, Z = I[$], b || h(), i(w), i(s, U.onLoad), U.h = U.height ? f(U.height, "y") - X - V : U.innerHeight && f(U.innerHeight, "y"), U.w = U.width ? f(U.width, "x") - Y - W : U.innerWidth && f(U.innerWidth, "x"), U.mw = U.w, U.mh = U.h, U.maxWidth && (U.mw = f(U.maxWidth, "x") - Y - W, U.mw = U.w && U.w < U.mw ? U.w : U.mw), U.maxHeight && (U.mh = f(U.maxHeight, "y") - X - V, U.mh = U.h && U.h < U.mh ? U.h : U.mh), c = U.href, bd = setTimeout(function() {
			M.show()
		}, 100), U.inline ? (d(bf).hide().insertBefore(a(c)[0]).one(w, function() {
			a(this).replaceWith(K.children())
		}), j(a(c))) : U.iframe ? j(" ") : U.html ? j(U.html) : g(c) ? (a(_ = new Image).addClass(p + "Photo").error(function() {
			U.title = !1, j(d(bf, "Error").text("This image could not be loaded"))
		}).load(function() {
			var a;
			_.onload = null, U.scalePhotos && (e = function() {
				_.height -= _.height * a, _.width -= _.width * a
			}, U.mw && _.width > U.mw && (a = (_.width - U.mw) / _.width, e()), U.mh && _.height > U.mh && (a = (_.height - U.mh) / _.height, e())), U.h && (_.style.marginTop = Math.max(U.h - _.height, 0) / 2 + "px"), I[1] && (U.loop || I[$ + 1]) && (_.style.cursor = "pointer", _.onclick = function() {
				be.next()
			}), x && (_.style.msInterpolationMode = "bicubic"), setTimeout(function() {
				j(_)
			}, 1)
		}), setTimeout(function() {
			_.src = c
		}, 1)) : c && L.load(c, U.data, function(b, c, e) {
			j(c === "error" ? d(bf, "Error").text("Request unsuccessful: " + e.statusText) : a(this).contents())
		})
	}, be.next = function() {
		!bb && I[1] && (U.loop || I[$ + 1]) && ($ = e(1), be.load())
	}, be.prev = function() {
		!bb && I[1] && (U.loop || $) && ($ = e(-1), be.load())
	}, be.close = function() {
		ba && !bc && (bc = !0, ba = !1, i(u, U.onCleanup), J.unbind("." + p + " ." + z), A.fadeTo(200, 0), B.stop().fadeTo(300, 0, function() {
			B.add(A).css({
				opacity: 1,
				cursor: "auto"
			}).hide(), i(w), K.remove(), setTimeout(function() {
				bc = !1, i(v, U.onClosed)
			}, 1)
		}))
	}, be.remove = function() {
		a([]).add(B).add(A).remove(), B = null, a("." + q).removeData(o).removeClass(q).die()
	}, be.element = function() {
		return a(Z)
	}, be.settings = n
}(jQuery, document, this), function(a) {
	function c(b) {
		a.fn.cycle.debug && d(b)
	}
	function d() {
		window.console && window.console.log && window.console.log("[cycle] " + Array.prototype.join.call(arguments, " "))
	}
	function e(b, c, e) {
		function i(b, c, e) {
			if (!b && c === !0) {
				var g = a(e).data("cycle.opts");
				if (!g) return d("options not found, can not resume"), !1;
				e.cycleTimeout && (clearTimeout(e.cycleTimeout), e.cycleTimeout = 0), l(g.elements, g, 1, !f.rev && !f.backwards)
			}
		}
		b.cycleStop == undefined && (b.cycleStop = 0);
		if (c === undefined || c === null) c = {};
		if (c.constructor == String) {
			switch (c) {
			case "destroy":
			case "stop":
				var f = a(b).data("cycle.opts");
				if (!f) return !1;
				return b.cycleStop++, b.cycleTimeout && clearTimeout(b.cycleTimeout), b.cycleTimeout = 0, a(b).removeData("cycle.opts"), c == "destroy" && g(f), !1;
			case "toggle":
				return b.cyclePause = b.cyclePause === 1 ? 0 : 1, i(b.cyclePause, e, b), !1;
			case "pause":
				return b.cyclePause = 1, !1;
			case "resume":
				return b.cyclePause = 0, i(!1, e, b), !1;
			case "prev":
			case "next":
				var f = a(b).data("cycle.opts");
				if (!f) return d('options not found, "prev/next" ignored'), !1;
				return a.fn.cycle[c](f), !1;
			default:
				c = {
					fx: c
				}
			}
			return c
		}
		if (c.constructor == Number) {
			var h = c;
			return c = a(b).data("cycle.opts"), c ? h < 0 || h >= c.elements.length ? (d("invalid slide index: " + h), !1) : (c.nextSlide = h, b.cycleTimeout && (clearTimeout(b.cycleTimeout), b.cycleTimeout = 0), typeof e == "string" && (c.oneTimeFx = e), l(c.elements, c, 1, h >= c.currSlide), !1) : (d("options not found, can not advance slide"), !1)
		}
		return c
	}
	function f(b, c) {
		if (!a.support.opacity && c.cleartype && b.style.filter) try {
			b.style.removeAttribute("filter")
		} catch (d) {}
	}
	function g(b) {
		b.next && a(b.next).unbind(b.prevNextEvent), b.prev && a(b.prev).unbind(b.prevNextEvent), (b.pager || b.pagerAnchorBuilder) && a.each(b.pagerAnchors || [], function() {
			this.unbind().remove()
		}), b.pagerAnchors = null, b.destroy && b.destroy(b)
	}
	function h(b, c, e, g, h) {
		var m = a.extend({}, a.fn.cycle.defaults, g || {}, a.metadata ? b.metadata() : a.meta ? b.data() : {});
		m.autostop && (m.countdown = m.autostopCount || e.length);
		var p = b[0];
		b.data("cycle.opts", m), m.$cont = b, m.stopCount = p.cycleStop, m.elements = e, m.before = m.before ? [m.before] : [], m.after = m.after ? [m.after] : [], m.after.unshift(function() {
			m.busy = 0
		}), !a.support.opacity && m.cleartype && m.after.push(function() {
			f(this, m)
		}), m.continuous && m.after.push(function() {
			l(e, m, 0, !m.rev && !m.backwards)
		}), i(m), !a.support.opacity && m.cleartype && !m.cleartypeNoBg && q(c), b.css("position") == "static" && b.css("position", "relative"), m.width && b.width(m.width), m.height && m.height != "auto" && b.height(m.height), m.startingSlide ? m.startingSlide = parseInt(m.startingSlide) : m.backwards && (m.startingSlide = e.length - 1);
		if (m.random) {
			m.randomMap = [];
			for (var r = 0; r < e.length; r++) m.randomMap.push(r);
			m.randomMap.sort(function(a, b) {
				return Math.random() - .5
			}), m.randomIndex = 1, m.startingSlide = m.randomMap[1]
		} else m.startingSlide >= e.length && (m.startingSlide = 0);
		m.currSlide = m.startingSlide || 0;
		var s = m.startingSlide;
		c.css({
			position: "absolute",
			top: 0,
			left: 0
		}).hide().each(function(b) {
			var c;
			m.backwards ? c = s ? b <= s ? e.length + (b - s) : s - b : e.length - b : c = s ? b >= s ? e.length - (b - s) : s - b : e.length - b, a(this).css("z-index", c)
		}), a(e[s]).css("opacity", 1).show(), f(e[s], m), m.fit && m.width && c.width(m.width), m.fit && m.height && m.height != "auto" && c.height(m.height);
		var t = m.containerResize && !b.innerHeight();
		if (t) {
			var u = 0,
				v = 0;
			for (var w = 0; w < e.length; w++) {
				var x = a(e[w]),
					y = x[0],
					z = x.outerWidth(),
					A = x.outerHeight();
				z || (z = y.offsetWidth || y.width || x.attr("width")), A || (A = y.offsetHeight || y.height || x.attr("height")), u = z > u ? z : u, v = A > v ? A : v
			}
			u > 0 && v > 0 && b.css({
				width: "570px",
				height: "150px"
			})
		}
		m.pause && b.hover(function() {
			this.cyclePause++
		}, function() {
			this.cyclePause--
		});
		if (j(m) === !1) return !1;
		var B = !1;
		g.requeueAttempts = g.requeueAttempts || 0, c.each(function() {
			var b = a(this);
			this.cycleH = m.fit && m.height ? m.height : b.height() || this.offsetHeight || this.height || b.attr("height") || 0, this.cycleW = m.fit && m.width ? m.width : b.width() || this.offsetWidth || this.width || b.attr("width") || 0;
			if (b.is("img")) {
				var c = a.browser.msie && this.cycleW == 28 && this.cycleH == 30 && !this.complete,
					e = a.browser.mozilla && this.cycleW == 34 && this.cycleH == 19 && !this.complete,
					f = a.browser.opera && (this.cycleW == 42 && this.cycleH == 19 || this.cycleW == 37 && this.cycleH == 17) && !this.complete,
					i = this.cycleH == 0 && this.cycleW == 0 && !this.complete;
				if (c || e || f || i) {
					if (h.s && m.requeueOnImageNotLoaded && ++g.requeueAttempts < 100) return d(g.requeueAttempts, " - img slide not loaded, requeuing slideshow: ", this.src, this.cycleW, this.cycleH), setTimeout(function() {
						a(h.s, h.c).cycle(g)
					}, m.requeueTimeout), B = !0, !1;
					d("could not determine size of image: " + this.src, this.cycleW, this.cycleH)
				}
			}
			return !0
		});
		if (B) return !1;
		m.cssBefore = m.cssBefore || {}, m.animIn = m.animIn || {}, m.animOut = m.animOut || {}, c.not(":eq(" + s + ")").css(m.cssBefore), m.cssFirst && a(c[s]).css(m.cssFirst);
		if (m.timeout) {
			m.timeout = parseInt(m.timeout), m.speed.constructor == String && (m.speed = a.fx.speeds[m.speed] || parseInt(m.speed)), m.sync || (m.speed = m.speed / 2);
			var C = m.fx == "shuffle" ? 500 : 250;
			while (m.timeout - m.speed < C) m.timeout += m.speed
		}
		m.easing && (m.easeIn = m.easeOut = m.easing), m.speedIn || (m.speedIn = m.speed), m.speedOut || (m.speedOut = m.speed), m.slideCount = e.length, m.currSlide = m.lastSlide = s, m.random ? (++m.randomIndex == e.length && (m.randomIndex = 0), m.nextSlide = m.randomMap[m.randomIndex]) : m.backwards ? m.nextSlide = m.startingSlide == 0 ? e.length - 1 : m.startingSlide - 1 : m.nextSlide = m.startingSlide >= e.length - 1 ? 0 : m.startingSlide + 1;
		if (!m.multiFx) {
			var D = a.fn.cycle.transitions[m.fx];
			if (a.isFunction(D)) D(b, c, m);
			else if (m.fx != "custom" && !m.multiFx) return d("unknown transition: " + m.fx, "; slideshow terminating"), !1
		}
		var E = c[s];
		return m.before.length && m.before[0].apply(E, [E, E, m, !0]), m.after.length > 1 && m.after[1].apply(E, [E, E, m, !0]), m.next && a(m.next).bind(m.prevNextEvent, function() {
			return n(m, m.rev ? -1 : 1)
		}), m.prev && a(m.prev).bind(m.prevNextEvent, function() {
			return n(m, m.rev ? 1 : -1)
		}), (m.pager || m.pagerAnchorBuilder) && o(e, m), k(m, e), m
	}
	function i(b) {
		b.original = {
			before: [],
			after: []
		}, b.original.cssBefore = a.extend({}, b.cssBefore), b.original.cssAfter = a.extend({}, b.cssAfter), b.original.animIn = a.extend({}, b.animIn), b.original.animOut = a.extend({}, b.animOut), a.each(b.before, function() {
			b.original.before.push(this)
		}), a.each(b.after, function() {
			b.original.after.push(this)
		})
	}
	function j(b) {
		var e, f, g = a.fn.cycle.transitions;
		if (b.fx.indexOf(",") > 0) {
			b.multiFx = !0, b.fxs = b.fx.replace(/\s*/g, "").split(",");
			for (e = 0; e < b.fxs.length; e++) {
				var h = b.fxs[e];
				f = g[h];
				if (!f || !g.hasOwnProperty(h) || !a.isFunction(f)) d("discarding unknown transition: ", h), b.fxs.splice(e, 1), e--
			}
			if (!b.fxs.length) return d("No valid transitions named; slideshow terminating."), !1
		} else if (b.fx == "all") {
			b.multiFx = !0, b.fxs = [];
			for (p in g) f = g[p], g.hasOwnProperty(p) && a.isFunction(f) && b.fxs.push(p)
		}
		if (b.multiFx && b.randomizeEffects) {
			var i = Math.floor(Math.random() * 20) + 30;
			for (e = 0; e < i; e++) {
				var j = Math.floor(Math.random() * b.fxs.length);
				b.fxs.push(b.fxs.splice(j, 1)[0])
			}
			c("randomized fx sequence: ", b.fxs)
		}
		return !0
	}
	function k(b, c) {
		b.addSlide = function(d, e) {
			var f = a(d),
				g = f[0];
			b.autostopCount || b.countdown++, c[e ? "unshift" : "push"](g), b.els && b.els[e ? "unshift" : "push"](g), b.slideCount = c.length, f.css("position", "absolute"), f[e ? "prependTo" : "appendTo"](b.$cont), e && (b.currSlide++, b.nextSlide++), !a.support.opacity && b.cleartype && !b.cleartypeNoBg && q(f), b.fit && b.width && f.width(b.width), b.fit && b.height && b.height != "auto" && $slides.height(b.height), g.cycleH = b.fit && b.height ? b.height : f.height(), g.cycleW = b.fit && b.width ? b.width : f.width(), f.css(b.cssBefore), (b.pager || b.pagerAnchorBuilder) && a.fn.cycle.createPagerAnchor(c.length - 1, g, a(b.pager), c, b), a.isFunction(b.onAddSlide) ? b.onAddSlide(f) : f.hide()
		}
	}
	function l(b, d, e, f) {
		e && d.busy && d.manualTrump && (c("manualTrump in go(), stopping active transition"), a(b).stop(!0, !0), d.busy = !1);
		if (d.busy) {
			c("transition active, ignoring new tx request");
			return
		}
		var g = d.$cont[0],
			h = b[d.currSlide],
			i = b[d.nextSlide];
		if (g.cycleStop != d.stopCount || g.cycleTimeout === 0 && !e) return;
		if (!e && !g.cyclePause && !d.bounce && (d.autostop && --d.countdown <= 0 || d.nowrap && !d.random && d.nextSlide < d.currSlide)) {
			d.end && d.end(d);
			return
		}
		var j = !1;
		if ((e || !g.cyclePause) && d.nextSlide != d.currSlide) {
			j = !0;
			var k = d.fx;
			h.cycleH = h.cycleH || a(h).height(), h.cycleW = h.cycleW || a(h).width(), i.cycleH = i.cycleH || a(i).height(), i.cycleW = i.cycleW || a(i).width();
			if (d.multiFx) {
				if (d.lastFx == undefined || ++d.lastFx >= d.fxs.length) d.lastFx = 0;
				k = d.fxs[d.lastFx], d.currFx = k
			}
			d.oneTimeFx && (k = d.oneTimeFx, d.oneTimeFx = null), a.fn.cycle.resetState(d, k), d.before.length && a.each(d.before, function(a, b) {
				if (g.cycleStop != d.stopCount) return;
				b.apply(i, [h, i, d, f])
			});
			var n = function() {
					a.each(d.after, function(a, b) {
						if (g.cycleStop != d.stopCount) return;
						b.apply(i, [h, i, d, f])
					})
				};
			c("tx firing; currSlide: " + d.currSlide + "; nextSlide: " + d.nextSlide), d.busy = 1, d.fxFn ? d.fxFn(h, i, d, n, f, e && d.fastOnEvent) : a.isFunction(a.fn.cycle[d.fx]) ? a.fn.cycle[d.fx](h, i, d, n, f, e && d.fastOnEvent) : a.fn.cycle.custom(h, i, d, n, f, e && d.fastOnEvent)
		}
		if (j || d.nextSlide == d.currSlide) {
			d.lastSlide = d.currSlide;
			if (d.random) d.currSlide = d.nextSlide, ++d.randomIndex == b.length && (d.randomIndex = 0), d.nextSlide = d.randomMap[d.randomIndex], d.nextSlide == d.currSlide && (d.nextSlide = d.currSlide == d.slideCount - 1 ? 0 : d.currSlide + 1);
			else if (d.backwards) {
				var o = d.nextSlide - 1 < 0;
				o && d.bounce ? (d.backwards = !d.backwards, d.nextSlide = 1, d.currSlide = 0) : (d.nextSlide = o ? b.length - 1 : d.nextSlide - 1, d.currSlide = o ? 0 : d.nextSlide + 1)
			} else {
				var o = d.nextSlide + 1 == b.length;
				o && d.bounce ? (d.backwards = !d.backwards, d.nextSlide = b.length - 2, d.currSlide = b.length - 1) : (d.nextSlide = o ? 0 : d.nextSlide + 1, d.currSlide = o ? b.length - 1 : d.nextSlide - 1)
			}
		}
		j && d.pager && d.updateActivePagerLink(d.pager, d.currSlide, d.activePagerClass);
		var p = 0;
		d.timeout && !d.continuous ? p = m(b[d.currSlide], b[d.nextSlide], d, f) : d.continuous && g.cyclePause && (p = 10), p > 0 && (g.cycleTimeout = setTimeout(function() {
			l(b, d, 0, !d.rev && !d.backwards)
		}, p))
	}
	function m(a, b, d, e) {
		if (d.timeoutFn) {
			var f = d.timeoutFn.call(a, a, b, d, e);
			while (f - d.speed < 250) f += d.speed;
			c("calculated timeout: " + f + "; speed: " + d.speed);
			if (f !== !1) return f
		}
		return d.timeout
	}
	function n(b, c) {
		var d = b.elements,
			e = b.$cont[0],
			f = e.cycleTimeout;
		f && (clearTimeout(f), e.cycleTimeout = 0);
		if (b.random && c < 0) b.randomIndex--, --b.randomIndex == -2 ? b.randomIndex = d.length - 2 : b.randomIndex == -1 && (b.randomIndex = d.length - 1), b.nextSlide = b.randomMap[b.randomIndex];
		else if (b.random) b.nextSlide = b.randomMap[b.randomIndex];
		else {
			b.nextSlide = b.currSlide + c;
			if (b.nextSlide < 0) {
				if (b.nowrap) return !1;
				b.nextSlide = d.length - 1
			} else if (b.nextSlide >= d.length) {
				if (b.nowrap) return !1;
				b.nextSlide = 0
			}
		}
		var g = b.onPrevNextEvent || b.prevNextClick;
		return a.isFunction(g) && g(c > 0, b.nextSlide, d[b.nextSlide]), l(d, b, 1, c >= 0), !1
	}
	function o(b, c) {
		var d = a(c.pager);
		a.each(b, function(e, f) {
			a.fn.cycle.createPagerAnchor(e, f, d, b, c)
		}), c.updateActivePagerLink(c.pager, c.startingSlide, c.activePagerClass)
	}
	function q(b) {
		function d(a) {
			return a = parseInt(a).toString(16), a.length < 2 ? "0" + a : a
		}
		function e(b) {
			for (; b && b.nodeName.toLowerCase() != "html"; b = b.parentNode) {
				var c = a.css(b, "background-color");
				if (c.indexOf("rgb") >= 0) {
					var e = c.match(/\d+/g);
					return "#" + d(e[0]) + d(e[1]) + d(e[2])
				}
				if (c && c != "transparent") return c
			}
			return "#ffffff"
		}
		c("applying clearType background-color hack"), b.each(function() {
			a(this).css("background-color", "transparent")
		})
	}
	var b = "2.88";
	a.support == undefined && (a.support = {
		opacity: !a.browser.msie
	}), a.fn.cycle = function(b, f) {
		var g = {
			s: this.selector,
			c: this.context
		};
		return this.length === 0 && b != "stop" ? !a.isReady && g.s ? (d("DOM not ready, queuing slideshow"), a(function() {
			a(g.s, g.c).cycle(b, f)
		}), this) : (d("terminating; zero elements found by selector" + (a.isReady ? "" : " (DOM not ready)")), this) : this.each(function() {
			var i = e(this, b, f);
			if (i === !1) return;
			i.updateActivePagerLink = i.updateActivePagerLink || a.fn.cycle.updateActivePagerLink, this.cycleTimeout && clearTimeout(this.cycleTimeout), this.cycleTimeout = this.cyclePause = 0;
			var j = a(this),
				k = i.slideExpr ? a(i.slideExpr, this) : j.children(),
				n = k.get();
			if (n.length < 2) {
				d("terminating; too few slides: " + n.length);
				return
			}
			var o = h(j, k, n, i, g);
			if (o === !1) return;
			var p = o.continuous ? 10 : m(n[o.currSlide], n[o.nextSlide], o, !o.rev);
			p && (p += o.delay || 0, p < 10 && (p = 10), c("first timeout: " + p), this.cycleTimeout = setTimeout(function() {
				l(n, o, 0, !o.rev && !i.backwards)
			}, p))
		})
	}, a.fn.cycle.resetState = function(b, c) {
		c = c || b.fx, b.before = [], b.after = [], b.cssBefore = a.extend({}, b.original.cssBefore), b.cssAfter = a.extend({}, b.original.cssAfter), b.animIn = a.extend({}, b.original.animIn), b.animOut = a.extend({}, b.original.animOut), b.fxFn = null, a.each(b.original.before, function() {
			b.before.push(this)
		}), a.each(b.original.after, function() {
			b.after.push(this)
		});
		var d = a.fn.cycle.transitions[c];
		a.isFunction(d) && d(b.$cont, a(b.elements), b)
	}, a.fn.cycle.updateActivePagerLink = function(b, c, d) {
		a(b).each(function() {
			a(this).children().removeClass(d).eq(c).addClass(d)
		})
	}, a.fn.cycle.next = function(a) {
		n(a, a.rev ? -1 : 1)
	}, a.fn.cycle.prev = function(a) {
		n(a, a.rev ? 1 : -1)
	}, a.fn.cycle.createPagerAnchor = function(b, d, e, f, g) {
		var h;
		a.isFunction(g.pagerAnchorBuilder) ? (h = g.pagerAnchorBuilder(b, d), c("pagerAnchorBuilder(" + b + ", el) returned: " + h)) : h = '<a href="#">' + (b + 1) + "</a>";
		if (!h) return;
		var i = a(h);
		if (i.parents("body").length === 0) {
			var j = [];
			e.length > 1 ? (e.each(function() {
				var b = i.clone(!0);
				a(this).append(b), j.push(b[0])
			}), i = a(j)) : i.appendTo(e)
		}
		g.pagerAnchors = g.pagerAnchors || [], g.pagerAnchors.push(i), i.bind(g.pagerEvent, function(c) {
			c.preventDefault(), g.nextSlide = b;
			var d = g.$cont[0],
				e = d.cycleTimeout;
			e && (clearTimeout(e), d.cycleTimeout = 0);
			var h = g.onPagerEvent || g.pagerClick;
			a.isFunction(h) && h(g.nextSlide, f[g.nextSlide]), l(f, g, 1, g.currSlide < b)
		}), !/^click/.test(g.pagerEvent) && !g.allowPagerClickBubble && i.bind("click.cycle", function() {
			return !1
		}), g.pauseOnPagerHover && i.hover(function() {
			g.$cont[0].cyclePause++
		}, function() {
			g.$cont[0].cyclePause--
		})
	}, a.fn.cycle.hopsFromLast = function(a, b) {
		var c, d = a.lastSlide,
			e = a.currSlide;
		return b ? c = e > d ? e - d : a.slideCount - d : c = e < d ? d - e : d + a.slideCount - e, c
	}, a.fn.cycle.commonReset = function(b, c, d, e, f, g) {
		a(d.elements).not(b).hide(), d.cssBefore.opacity = 1, d.cssBefore.display = "block", e !== !1 && c.cycleW > 0 && (d.cssBefore.width = c.cycleW), f !== !1 && c.cycleH > 0 && (d.cssBefore.height = c.cycleH), d.cssAfter = d.cssAfter || {}, d.cssAfter.display = "none", a(b).css("zIndex", d.slideCount + (g === !0 ? 1 : 0)), a(c).css("zIndex", d.slideCount + (g === !0 ? 0 : 1))
	}, a.fn.cycle.custom = function(b, c, d, e, f, g) {
		var h = a(b),
			i = a(c),
			j = d.speedIn,
			k = d.speedOut,
			l = d.easeIn,
			m = d.easeOut;
		i.css(d.cssBefore), g && (typeof g == "number" ? j = k = g : j = k = 1, l = m = null);
		var n = function() {
				i.animate(d.animIn, j, l, e)
			};
		h.animate(d.animOut, k, m, function() {
			d.cssAfter && h.css(d.cssAfter), d.sync || n()
		}), d.sync && n()
	}, a.fn.cycle.transitions = {
		fade: function(b, c, d) {
			c.not(":eq(" + d.currSlide + ")").css("opacity", 0), d.before.push(function(b, c, d) {
				a.fn.cycle.commonReset(b, c, d), d.cssBefore.opacity = 0
			}), d.animIn = {
				opacity: 1
			}, d.animOut = {
				opacity: 0
			}, d.cssBefore = {
				top: 0,
				left: 0
			}
		}
	}, a.fn.cycle.ver = function() {
		return b
	}, a.fn.cycle.defaults = {
		fx: "fade",
		timeout: 4e3,
		timeoutFn: null,
		continuous: 0,
		speed: 1e3,
		speedIn: null,
		speedOut: null,
		next: null,
		prev: null,
		onPrevNextEvent: null,
		prevNextEvent: "click.cycle",
		pager: null,
		onPagerEvent: null,
		pagerEvent: "click.cycle",
		allowPagerClickBubble: !1,
		pagerAnchorBuilder: null,
		before: null,
		after: null,
		end: null,
		easing: null,
		easeIn: null,
		easeOut: null,
		shuffle: null,
		animIn: null,
		animOut: null,
		cssBefore: null,
		cssAfter: null,
		fxFn: null,
		height: "auto",
		startingSlide: 0,
		sync: 1,
		random: 0,
		fit: 0,
		containerResize: 1,
		pause: 0,
		pauseOnPagerHover: 0,
		autostop: 0,
		autostopCount: 0,
		delay: 0,
		slideExpr: null,
		cleartype: !a.support.opacity,
		cleartypeNoBg: !1,
		nowrap: 0,
		fastOnEvent: 0,
		randomizeEffects: 1,
		rev: 0,
		manualTrump: !0,
		requeueOnImageNotLoaded: !0,
		requeueTimeout: 250,
		activePagerClass: "activeSlide",
		updateActivePagerLink: null,
		backwards: !1
	}
}(jQuery);
jQuery(document).ready(function($) {
	$body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
	$('.searchbarswitch').toggle(function() {
		$(".searchbar").animate({
			marginTop: "15px"
		}, 350, "easeOutBounce");
		$(".searchfade").fadeIn("slow");
	}, function() {
		$(".searchbar").animate({
			marginTop: "0px"
		}, "slow");
		$(".searchfade").fadeOut("slow");
	});
});
(function(a) {
	var b = function(b, c) {
			var d = a.extend({}, a.fn.nivoSlider.defaults, c);
			var e = {
				currentSlide: 0,
				currentImage: "",
				totalSlides: 0,
				running: false,
				paused: false,
				stop: false
			};
			var f = a(b);
			f.data("nivo:vars", e);
			f.css("position", "relative");
			f.addClass("nivoSlider");
			var g = f.children();
			g.each(function() {
				var b = a(this);
				var c = "";
				if (!b.is("img")) {
					if (b.is("a")) {
						b.addClass("nivo-imageLink");
						c = b
					}
					b = b.find("img:first")
				}
				var d = b.width();
				if (d == 0) d = b.attr("width");
				var g = b.height();
				if (g == 0) g = b.attr("height");
				if (d > f.width()) {
					f.width(d)
				}
				if (g > f.height()) {
					f.height(g)
				}
				if (c != "") {
					c.css("display", "none")
				}
				b.css("display", "none");
				e.totalSlides++
			});
			if (d.randomStart) {
				d.startSlide = Math.floor(Math.random() * e.totalSlides)
			}
			if (d.startSlide > 0) {
				if (d.startSlide >= e.totalSlides) d.startSlide = e.totalSlides - 1;
				e.currentSlide = d.startSlide
			}
			if (a(g[e.currentSlide]).is("img")) {
				e.currentImage = a(g[e.currentSlide])
			} else {
				e.currentImage = a(g[e.currentSlide]).find("img:first")
			}
			if (a(g[e.currentSlide]).is("a")) {
				a(g[e.currentSlide]).css("display", "block")
			}
			f.css("background", 'url("' + e.currentImage.attr("src") + '") no-repeat');
			f.append(a('<div class="nivo-caption"><p></p></div>').css({
				display: "none",
				opacity: d.captionOpacity
			}));
			a(".nivo-caption", f).css("opacity", 0);
			var h = function(b) {
					var c = a(".nivo-caption", f);
					if (e.currentImage.attr("title") != "" && e.currentImage.attr("title") != undefined) {
						var d = e.currentImage.attr("title");
						if (d.substr(0, 1) == "#") d = a(d).html();
						if (c.css("opacity") != 0) {
							c.find("p").stop().fadeTo(b.animSpeed, 0, function() {
								a(this).html(d);
								a(this).stop().fadeTo(b.animSpeed, 1)
							})
						} else {
							c.find("p").html(d)
						}
						c.stop().fadeTo(b.animSpeed, b.captionOpacity)
					} else {
						c.stop().fadeTo(b.animSpeed, 0)
					}
				};
			h(d);
			var i = 0;
			if (!d.manualAdvance && g.length > 1) {
				i = setInterval(function() {
					o(f, g, d, false)
				}, d.pauseTime)
			}
			if (d.directionNav) {
				f.append('<div class="nivo-directionNav"><a class="nivo-prevNav">' + d.prevText + '</a><a class="nivo-nextNav">' + d.nextText + "</a></div>");
				if (d.directionNavHide) {
					a(".nivo-directionNav", f).hide();
					f.hover(function() {
						a(".nivo-directionNav", f).show()
					}, function() {
						a(".nivo-directionNav", f).hide()
					})
				}
				a("a.nivo-prevNav", f).live("click", function() {
					if (e.running) return false;
					clearInterval(i);
					i = "";
					e.currentSlide -= 2;
					o(f, g, d, "prev")
				});
				a("a.nivo-nextNav", f).live("click", function() {
					if (e.running) return false;
					clearInterval(i);
					i = "";
					o(f, g, d, "next")
				})
			}
			if (d.controlNav) {
				var j = a('<div class="nivo-controlNav"></div>');
				f.append(j);
				for (var k = 0; k < g.length; k++) {
					if (d.controlNavThumbs) {
						var l = g.eq(k);
						if (!l.is("img")) {
							l = l.find("img:first")
						}
						if (d.controlNavThumbsFromRel) {
							j.append('<a class="nivo-control" rel="' + k + '"><img src="' + l.attr("rel") + '" alt="" /></a>')
						} else {
							j.append('<a class="nivo-control" rel="' + k + '"><img src="' + l.attr("src").replace(d.controlNavThumbsSearch, d.controlNavThumbsReplace) + '" alt="" /></a>')
						}
					} else {
						j.append('<a class="nivo-control" rel="' + k + '">' + (k + 1) + "</a>")
					}
				}
				a(".nivo-controlNav a:eq(" + e.currentSlide + ")", f).addClass("active");
				a(".nivo-controlNav a", f).live("click", function() {
					if (e.running) return false;
					if (a(this).hasClass("active")) return false;
					clearInterval(i);
					i = "";
					f.css("background", 'url("' + e.currentImage.attr("src") + '") no-repeat');
					e.currentSlide = a(this).attr("rel") - 1;
					o(f, g, d, "control")
				})
			}
			if (d.keyboardNav) {
				a(window).keypress(function(a) {
					if (a.keyCode == "37") {
						if (e.running) return false;
						clearInterval(i);
						i = "";
						e.currentSlide -= 2;
						o(f, g, d, "prev")
					}
					if (a.keyCode == "39") {
						if (e.running) return false;
						clearInterval(i);
						i = "";
						o(f, g, d, "next")
					}
				})
			}
			if (d.pauseOnHover) {
				f.hover(function() {
					e.paused = true;
					clearInterval(i);
					i = ""
				}, function() {
					e.paused = false;
					if (i == "" && !d.manualAdvance) {
						i = setInterval(function() {
							o(f, g, d, false)
						}, d.pauseTime)
					}
				})
			}
			f.bind("nivo:animFinished", function() {
				e.running = false;
				a(g).each(function() {
					if (a(this).is("a")) {
						a(this).css("display", "none")
					}
				});
				if (a(g[e.currentSlide]).is("a")) {
					a(g[e.currentSlide]).css("display", "block")
				}
				if (i == "" && !e.paused && !d.manualAdvance) {
					i = setInterval(function() {
						o(f, g, d, false)
					}, d.pauseTime)
				}
				d.afterChange.call(this)
			});
			var m = function(b, c, d) {
					for (var e = 0; e < c.slices; e++) {
						var f = Math.round(b.width() / c.slices);
						if (e == c.slices - 1) {
							b.append(a('<div class="nivo-slice"></div>').css({
								left: f * e + "px",
								width: b.width() - f * e + "px",
								height: "0px",
								opacity: "0",
								background: 'url("' + d.currentImage.attr("src") + '") no-repeat -' + (f + e * f - f) + "px 0%"
							}))
						} else {
							b.append(a('<div class="nivo-slice"></div>').css({
								left: f * e + "px",
								width: f + "px",
								height: "0px",
								opacity: "0",
								background: 'url("' + d.currentImage.attr("src") + '") no-repeat -' + (f + e * f - f) + "px 0%"
							}))
						}
					}
				};
			var n = function(b, c, d) {
					var e = Math.round(b.width() / c.boxCols);
					var f = Math.round(b.height() / c.boxRows);
					for (var g = 0; g < c.boxRows; g++) {
						for (var h = 0; h < c.boxCols; h++) {
							if (h == c.boxCols - 1) {
								b.append(a('<div class="nivo-box"></div>').css({
									opacity: 0,
									left: e * h + "px",
									top: f * g + "px",
									width: b.width() - e * h + "px",
									height: f + "px",
									background: 'url("' + d.currentImage.attr("src") + '") no-repeat -' + (e + h * e - e) + "px -" + (f + g * f - f) + "px"
								}))
							} else {
								b.append(a('<div class="nivo-box"></div>').css({
									opacity: 0,
									left: e * h + "px",
									top: f * g + "px",
									width: e + "px",
									height: f + "px",
									background: 'url("' + d.currentImage.attr("src") + '") no-repeat -' + (e + h * e - e) + "px -" + (f + g * f - f) + "px"
								}))
							}
						}
					}
				};
			var o = function(b, c, d, e) {
					var f = b.data("nivo:vars");
					if (f && f.currentSlide == f.totalSlides - 1) {
						d.lastSlide.call(this)
					}
					if ((!f || f.stop) && !e) return false;
					d.beforeChange.call(this);
					if (!e) {
						b.css("background", 'url("' + f.currentImage.attr("src") + '") no-repeat')
					} else {
						if (e == "prev") {
							b.css("background", 'url("' + f.currentImage.attr("src") + '") no-repeat')
						}
						if (e == "next") {
							b.css("background", 'url("' + f.currentImage.attr("src") + '") no-repeat')
						}
					}
					f.currentSlide++;
					if (f.currentSlide == f.totalSlides) {
						f.currentSlide = 0;
						d.slideshowEnd.call(this)
					}
					if (f.currentSlide < 0) f.currentSlide = f.totalSlides - 1;
					if (a(c[f.currentSlide]).is("img")) {
						f.currentImage = a(c[f.currentSlide])
					} else {
						f.currentImage = a(c[f.currentSlide]).find("img:first")
					}
					if (d.controlNav) {
						a(".nivo-controlNav a", b).removeClass("active");
						a(".nivo-controlNav a:eq(" + f.currentSlide + ")", b).addClass("active")
					}
					h(d);
					a(".nivo-slice", b).remove();
					a(".nivo-box", b).remove();
					var g = d.effect;
					if (d.effect == "random") {
						var i = new Array("sliceDownRight", "sliceDownLeft", "sliceUpRight", "sliceUpLeft", "sliceUpDown", "sliceUpDownLeft", "fold", "fade", "boxRandom", "boxRain", "boxRainReverse", "boxRainGrow", "boxRainGrowReverse");
						g = i[Math.floor(Math.random() * (i.length + 1))];
						if (g == undefined) g = "fade"
					}
					if (d.effect.indexOf(",") != -1) {
						var i = d.effect.split(",");
						g = i[Math.floor(Math.random() * i.length)];
						if (g == undefined) g = "fade"
					}
					if (f.currentImage.attr("data-transition")) {
						g = f.currentImage.attr("data-transition")
					}
					f.running = true;
					if (g == "sliceDown" || g == "sliceDownRight" || g == "sliceDownLeft") {
						m(b, d, f);
						var j = 0;
						var k = 0;
						var l = a(".nivo-slice", b);
						if (g == "sliceDownLeft") l = a(".nivo-slice", b)._reverse();
						l.each(function() {
							var c = a(this);
							c.css({
								top: "0px"
							});
							if (k == d.slices - 1) {
								setTimeout(function() {
									c.animate({
										height: "100%",
										opacity: "1.0"
									}, d.animSpeed, "", function() {
										b.trigger("nivo:animFinished")
									})
								}, 100 + j)
							} else {
								setTimeout(function() {
									c.animate({
										height: "100%",
										opacity: "1.0"
									}, d.animSpeed)
								}, 100 + j)
							}
							j += 50;
							k++
						})
					} else if (g == "sliceUp" || g == "sliceUpRight" || g == "sliceUpLeft") {
						m(b, d, f);
						var j = 0;
						var k = 0;
						var l = a(".nivo-slice", b);
						if (g == "sliceUpLeft") l = a(".nivo-slice", b)._reverse();
						l.each(function() {
							var c = a(this);
							c.css({
								bottom: "0px"
							});
							if (k == d.slices - 1) {
								setTimeout(function() {
									c.animate({
										height: "100%",
										opacity: "1.0"
									}, d.animSpeed, "", function() {
										b.trigger("nivo:animFinished")
									})
								}, 100 + j)
							} else {
								setTimeout(function() {
									c.animate({
										height: "100%",
										opacity: "1.0"
									}, d.animSpeed)
								}, 100 + j)
							}
							j += 50;
							k++
						})
					} else if (g == "sliceUpDown" || g == "sliceUpDownRight" || g == "sliceUpDownLeft") {
						m(b, d, f);
						var j = 0;
						var k = 0;
						var o = 0;
						var l = a(".nivo-slice", b);
						if (g == "sliceUpDownLeft") l = a(".nivo-slice", b)._reverse();
						l.each(function() {
							var c = a(this);
							if (k == 0) {
								c.css("top", "0px");
								k++
							} else {
								c.css("bottom", "0px");
								k = 0
							}
							if (o == d.slices - 1) {
								setTimeout(function() {
									c.animate({
										height: "100%",
										opacity: "1.0"
									}, d.animSpeed, "", function() {
										b.trigger("nivo:animFinished")
									})
								}, 100 + j)
							} else {
								setTimeout(function() {
									c.animate({
										height: "100%",
										opacity: "1.0"
									}, d.animSpeed)
								}, 100 + j)
							}
							j += 50;
							o++
						})
					} else if (g == "fold") {
						m(b, d, f);
						var j = 0;
						var k = 0;
						a(".nivo-slice", b).each(function() {
							var c = a(this);
							var e = c.width();
							c.css({
								top: "0px",
								height: "100%",
								width: "0px"
							});
							if (k == d.slices - 1) {
								setTimeout(function() {
									c.animate({
										width: e,
										opacity: "1.0"
									}, d.animSpeed, "", function() {
										b.trigger("nivo:animFinished")
									})
								}, 100 + j)
							} else {
								setTimeout(function() {
									c.animate({
										width: e,
										opacity: "1.0"
									}, d.animSpeed)
								}, 100 + j)
							}
							j += 50;
							k++
						})
					} else if (g == "fade") {
						m(b, d, f);
						var q = a(".nivo-slice:first", b);
						q.css({
							height: "100%",
							width: b.width() + "px"
						});
						q.animate({
							opacity: "1.0"
						}, d.animSpeed * 2, "", function() {
							b.trigger("nivo:animFinished")
						})
					} else if (g == "slideInRight") {
						m(b, d, f);
						var q = a(".nivo-slice:first", b);
						q.css({
							height: "100%",
							width: "0px",
							opacity: "1"
						});
						q.animate({
							width: b.width() + "px"
						}, d.animSpeed * 2, "", function() {
							b.trigger("nivo:animFinished")
						})
					} else if (g == "slideInLeft") {
						m(b, d, f);
						var q = a(".nivo-slice:first", b);
						q.css({
							height: "100%",
							width: "0px",
							opacity: "1",
							left: "",
							right: "0px"
						});
						q.animate({
							width: b.width() + "px"
						}, d.animSpeed * 2, "", function() {
							q.css({
								left: "0px",
								right: ""
							});
							b.trigger("nivo:animFinished")
						})
					} else if (g == "boxRandom") {
						n(b, d, f);
						var r = d.boxCols * d.boxRows;
						var k = 0;
						var j = 0;
						var s = p(a(".nivo-box", b));
						s.each(function() {
							var c = a(this);
							if (k == r - 1) {
								setTimeout(function() {
									c.animate({
										opacity: "1"
									}, d.animSpeed, "", function() {
										b.trigger("nivo:animFinished")
									})
								}, 100 + j)
							} else {
								setTimeout(function() {
									c.animate({
										opacity: "1"
									}, d.animSpeed)
								}, 100 + j)
							}
							j += 20;
							k++
						})
					} else if (g == "boxRain" || g == "boxRainReverse" || g == "boxRainGrow" || g == "boxRainGrowReverse") {
						n(b, d, f);
						var r = d.boxCols * d.boxRows;
						var k = 0;
						var j = 0;
						var t = 0;
						var u = 0;
						var v = new Array;
						v[t] = new Array;
						var s = a(".nivo-box", b);
						if (g == "boxRainReverse" || g == "boxRainGrowReverse") {
							s = a(".nivo-box", b)._reverse()
						}
						s.each(function() {
							v[t][u] = a(this);
							u++;
							if (u == d.boxCols) {
								t++;
								u = 0;
								v[t] = new Array
							}
						});
						for (var w = 0; w < d.boxCols * 2; w++) {
							var x = w;
							for (var y = 0; y < d.boxRows; y++) {
								if (x >= 0 && x < d.boxCols) {
									(function(c, e, f, h, i) {
										var j = a(v[c][e]);
										var k = j.width();
										var l = j.height();
										if (g == "boxRainGrow" || g == "boxRainGrowReverse") {
											j.width(0).height(0)
										}
										if (h == i - 1) {
											setTimeout(function() {
												j.animate({
													opacity: "1",
													width: k,
													height: l
												}, d.animSpeed / 1.3, "", function() {
													b.trigger("nivo:animFinished")
												})
											}, 100 + f)
										} else {
											setTimeout(function() {
												j.animate({
													opacity: "1",
													width: k,
													height: l
												}, d.animSpeed / 1.3)
											}, 100 + f)
										}
									})(y, x, j, k, r);
									k++
								}
								x--
							}
							j += 100
						}
					}
				};
			var p = function(a) {
					for (var b, c, d = a.length; d; b = parseInt(Math.random() * d), c = a[--d], a[d] = a[b], a[b] = c);
					return a
				};
			var q = function(a) {
					if (this.console && typeof console.log != "undefined") console.log(a)
				};
			this.stop = function() {
				if (!a(b).data("nivo:vars").stop) {
					a(b).data("nivo:vars").stop = true;
					q("Stop Slider")
				}
			};
			this.start = function() {
				if (a(b).data("nivo:vars").stop) {
					a(b).data("nivo:vars").stop = false;
					q("Start Slider")
				}
			};
			d.afterLoad.call(this);
			return this
		};
	a.fn.nivoSlider = function(c) {
		return this.each(function(d, e) {
			var f = a(this);
			if (f.data("nivoslider")) return f.data("nivoslider");
			var g = new b(this, c);
			f.data("nivoslider", g)
		})
	};
	a.fn.nivoSlider.defaults = {
		effect: "random",
		slices: 15,
		boxCols: 8,
		boxRows: 4,
		animSpeed: 500,
		pauseTime: 3e3,
		startSlide: 0,
		directionNav: true,
		directionNavHide: true,
		controlNav: true,
		controlNavThumbs: false,
		controlNavThumbsFromRel: false,
		controlNavThumbsSearch: ".jpg",
		controlNavThumbsReplace: "_thumb.jpg",
		keyboardNav: true,
		pauseOnHover: true,
		manualAdvance: false,
		captionOpacity: .8,
		prevText: "Prev",
		nextText: "Next",
		randomStart: false,
		beforeChange: function() {},
		afterChange: function() {},
		slideshowEnd: function() {},
		lastSlide: function() {},
		afterLoad: function() {}
	};
	a.fn._reverse = [].reverse
})(jQuery);
jQuery(document).ready(function($) {
	var k = isIE();
	if (k) {
		$(window).load(function() {
			$('#frame img').fadeIn(500);
			$('#frame img').each(function() {
				var el = $(this);
				el.css({
					"position": "absolute"
				}).clone().addClass('img_grayscale').insertAfter(el);
				this.src = grayscale(this.src);
				el.parent().find('img').eq(0).css({
					opacity: 0,
					'z-index': -110
				})
			});
			$('#frame a').hover(function() {
				$(this).children('img').eq(0).stop().animate({
					opacity: 1
				}, 600)
			}, function() {
				$(this).children('img').eq(0).stop().animate({
					opacity: 0
				}, 600)
			})
		})
	} else {
		return false
	}
	function isIE() {
		var c;
		if (window.ActiveXObject) {
			var d = navigator.userAgent;
			var b = new RegExp("MSIE (\\d+\\.\\d+);");
			b.test(d);
			c = parseFloat(RegExp["$1"])
		}
		return c < 9 ? false : true
	}
	function grayscale(src) {
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		var imgObj = new Image();
		imgObj.src = src;
		canvas.width = imgObj.width;
		canvas.height = imgObj.height;
		ctx.drawImage(imgObj, 0, 0);
		var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
		for (var y = 0; y < imgPixels.height; y++) {
			for (var x = 0; x < imgPixels.width; x++) {
				var i = (y * 4) * imgPixels.width + x * 4;
				var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
				imgPixels.data[i] = avg;
				imgPixels.data[i + 1] = avg;
				imgPixels.data[i + 2] = avg
			}
		}
		ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
		return canvas.toDataURL()
	}
});
(function($) {
	$.fn.lightBox = function(settings) {
		settings = jQuery.extend({
			overlayBgColor: '#000',
			overlayOpacity: 0.8,
			fixedNavigation: false,
			imageLoading: '/wp-content/themes/Mossight/images/loading.gif',
			imageBtnPrev: '/wp-content/themes/Mossight/images/prev.gif',
			imageBtnNext: '/wp-content/themes/Mossight/images/next.gif',
			imageBtnClose: '/wp-content/themes/Mossight/images/close.gif',
			imageBlank: '/wp-content/themes/Mossight/images/blank.gif',
			containerBorderSize: 10,
			containerResizeSpeed: 400,
			txtImage: 'Image',
			txtOf: 'of',
			keyToClose: 'c',
			keyToPrev: 'p',
			keyToNext: 'n',
			imageArray: [],
			activeImage: 0
		}, settings);
		var jQueryMatchedObj = this;

		function _initialize() {
			_start(this, jQueryMatchedObj);
			return false;
		}
		function _start(objClicked, jQueryMatchedObj) {
			$('embed, object, select').css({
				'visibility': 'hidden'
			});
			_set_interface();
			settings.imageArray.length = 0;
			settings.activeImage = 0;
			if (jQueryMatchedObj.length == 1) {
				settings.imageArray.push(new Array(objClicked.getAttribute('href'), objClicked.getAttribute('title')));
			} else {
				for (var i = 0; i < jQueryMatchedObj.length; i++) {
					settings.imageArray.push(new Array(jQueryMatchedObj[i].getAttribute('href'), jQueryMatchedObj[i].getAttribute('title')));
				}
			}
			while (settings.imageArray[settings.activeImage][0] != objClicked.getAttribute('href')) {
				settings.activeImage++;
			}
			_set_image_to_view();
		}
		function _set_interface() {
			$('body').append('<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box"><div id="lightbox-container-image"><img id="lightbox-image"><div style="" id="lightbox-nav"><a href="#" id="lightbox-nav-btnPrev"></a><a href="#" id="lightbox-nav-btnNext"></a></div><div id="lightbox-loading"><a href="#" id="lightbox-loading-link"><img src="' + settings.imageLoading + '"></a></div></div></div><div id="lightbox-container-image-data-box"><div id="lightbox-container-image-data"><div id="lightbox-image-details"><span id="lightbox-image-details-caption"></span><span id="lightbox-image-details-currentNumber"></span></div><div id="lightbox-secNav"><a href="#" id="lightbox-secNav-btnClose"><img src="' + settings.imageBtnClose + '"></a></div></div></div></div>');
			var arrPageSizes = ___getPageSize();
			$('#jquery-overlay').css({
				backgroundColor: settings.overlayBgColor,
				opacity: settings.overlayOpacity,
				width: arrPageSizes[0],
				height: arrPageSizes[1]
			}).fadeIn();
			var arrPageScroll = ___getPageScroll();
			$('#jquery-lightbox').css({
				top: arrPageScroll[1] + (arrPageSizes[3] / 10),
				left: arrPageScroll[0]
			}).show();
			$('#jquery-overlay,#jquery-lightbox').click(function() {
				_finish();
			});
			$('#lightbox-loading-link,#lightbox-secNav-btnClose').click(function() {
				_finish();
				return false;
			});
			$(window).resize(function() {
				var arrPageSizes = ___getPageSize();
				$('#jquery-overlay').css({
					width: arrPageSizes[0],
					height: arrPageSizes[1]
				});
				var arrPageScroll = ___getPageScroll();
				$('#jquery-lightbox').css({
					top: arrPageScroll[1] + (arrPageSizes[3] / 10),
					left: arrPageScroll[0]
				});
			});
		}
		function _set_image_to_view() {
			$('#lightbox-loading').show();
			if (settings.fixedNavigation) {
				$('#lightbox-image,#lightbox-container-image-data-box,#lightbox-image-details-currentNumber').hide();
			} else {
				$('#lightbox-image,#lightbox-nav,#lightbox-nav-btnPrev,#lightbox-nav-btnNext,#lightbox-container-image-data-box,#lightbox-image-details-currentNumber').hide();
			}
			var objImagePreloader = new Image();
			objImagePreloader.onload = function() {
				$('#lightbox-image').attr('src', settings.imageArray[settings.activeImage][0]);
				_resize_container_image_box(objImagePreloader.width, objImagePreloader.height);
				objImagePreloader.onload = function() {};
			};
			objImagePreloader.src = settings.imageArray[settings.activeImage][0];
		};

		function _resize_container_image_box(intImageWidth, intImageHeight) {
			var intCurrentWidth = $('#lightbox-container-image-box').width();
			var intCurrentHeight = $('#lightbox-container-image-box').height();
			var intWidth = (intImageWidth + (settings.containerBorderSize * 2));
			var intHeight = (intImageHeight + (settings.containerBorderSize * 2));
			var intDiffW = intCurrentWidth - intWidth;
			var intDiffH = intCurrentHeight - intHeight;
			$('#lightbox-container-image-box').animate({
				width: intWidth,
				height: intHeight
			}, settings.containerResizeSpeed, function() {
				_show_image();
			});
			if ((intDiffW == 0) && (intDiffH == 0)) {
				if ($.browser.msie) {
					___pause(250);
				} else {
					___pause(100);
				}
			}
			$('#lightbox-container-image-data-box').css({
				width: intImageWidth
			});
			$('#lightbox-nav-btnPrev,#lightbox-nav-btnNext').css({
				height: intImageHeight + (settings.containerBorderSize * 2)
			});
		};

		function _show_image() {
			$('#lightbox-loading').hide();
			$('#lightbox-image').fadeIn(function() {
				_show_image_data();
				_set_navigation();
			});
			_preload_neighbor_images();
		};

		function _show_image_data() {
			$('#lightbox-container-image-data-box').slideDown('fast');
			$('#lightbox-image-details-caption').hide();
			if (settings.imageArray[settings.activeImage][1]) {
				$('#lightbox-image-details-caption').html(settings.imageArray[settings.activeImage][1]).show();
			}
			if (settings.imageArray.length > 1) {
				$('#lightbox-image-details-currentNumber').html(settings.txtImage + ' ' + (settings.activeImage + 1) + ' ' + settings.txtOf + ' ' + settings.imageArray.length).show();
			}
		}
		function _set_navigation() {
			$('#lightbox-nav').show();
			$('#lightbox-nav-btnPrev,#lightbox-nav-btnNext').css({
				'background': 'transparent url(' + settings.imageBlank + ') no-repeat'
			});
			if (settings.activeImage != 0) {
				if (settings.fixedNavigation) {
					$('#lightbox-nav-btnPrev').css({
						'background': 'url(' + settings.imageBtnPrev + ') left 15% no-repeat'
					}).unbind().bind('click', function() {
						settings.activeImage = settings.activeImage - 1;
						_set_image_to_view();
						return false;
					});
				} else {
					$('#lightbox-nav-btnPrev').unbind().hover(function() {
						$(this).css({
							'background': 'url(' + settings.imageBtnPrev + ') left 15% no-repeat'
						});
					}, function() {
						$(this).css({
							'background': 'transparent url(' + settings.imageBlank + ') no-repeat'
						});
					}).show().bind('click', function() {
						settings.activeImage = settings.activeImage - 1;
						_set_image_to_view();
						return false;
					});
				}
			}
			if (settings.activeImage != (settings.imageArray.length - 1)) {
				if (settings.fixedNavigation) {
					$('#lightbox-nav-btnNext').css({
						'background': 'url(' + settings.imageBtnNext + ') right 15% no-repeat'
					}).unbind().bind('click', function() {
						settings.activeImage = settings.activeImage + 1;
						_set_image_to_view();
						return false;
					});
				} else {
					$('#lightbox-nav-btnNext').unbind().hover(function() {
						$(this).css({
							'background': 'url(' + settings.imageBtnNext + ') right 15% no-repeat'
						});
					}, function() {
						$(this).css({
							'background': 'transparent url(' + settings.imageBlank + ') no-repeat'
						});
					}).show().bind('click', function() {
						settings.activeImage = settings.activeImage + 1;
						_set_image_to_view();
						return false;
					});
				}
			}
			_enable_keyboard_navigation();
		}
		function _enable_keyboard_navigation() {
			$(document).keydown(function(objEvent) {
				_keyboard_action(objEvent);
			});
		}
		function _disable_keyboard_navigation() {
			$(document).unbind();
		}
		function _keyboard_action(objEvent) {
			if (objEvent == null) {
				keycode = event.keyCode;
				escapeKey = 27;
			} else {
				keycode = objEvent.keyCode;
				escapeKey = objEvent.DOM_VK_ESCAPE;
			}
			key = String.fromCharCode(keycode).toLowerCase();
			if ((key == settings.keyToClose) || (key == 'x') || (keycode == escapeKey)) {
				_finish();
			}
			if ((key == settings.keyToPrev) || (keycode == 37)) {
				if (settings.activeImage != 0) {
					settings.activeImage = settings.activeImage - 1;
					_set_image_to_view();
					_disable_keyboard_navigation();
				}
			}
			if ((key == settings.keyToNext) || (keycode == 39)) {
				if (settings.activeImage != (settings.imageArray.length - 1)) {
					settings.activeImage = settings.activeImage + 1;
					_set_image_to_view();
					_disable_keyboard_navigation();
				}
			}
		}
		function _preload_neighbor_images() {
			if ((settings.imageArray.length - 1) > settings.activeImage) {
				objNext = new Image();
				objNext.src = settings.imageArray[settings.activeImage + 1][0];
			}
			if (settings.activeImage > 0) {
				objPrev = new Image();
				objPrev.src = settings.imageArray[settings.activeImage - 1][0];
			}
		}
		function _finish() {
			$('#jquery-lightbox').remove();
			$('#jquery-overlay').fadeOut(function() {
				$('#jquery-overlay').remove();
			});
			$('embed, object, select').css({
				'visibility': 'visible'
			});
		}
		function ___getPageSize() {
			var xScroll, yScroll;
			if (window.innerHeight && window.scrollMaxY) {
				xScroll = window.innerWidth + window.scrollMaxX;
				yScroll = window.innerHeight + window.scrollMaxY;
			} else if (document.body.scrollHeight > document.body.offsetHeight) {
				xScroll = document.body.scrollWidth;
				yScroll = document.body.scrollHeight;
			} else {
				xScroll = document.body.offsetWidth;
				yScroll = document.body.offsetHeight;
			}
			var windowWidth, windowHeight;
			if (self.innerHeight) {
				if (document.documentElement.clientWidth) {
					windowWidth = document.documentElement.clientWidth;
				} else {
					windowWidth = self.innerWidth;
				}
				windowHeight = self.innerHeight;
			} else if (document.documentElement && document.documentElement.clientHeight) {
				windowWidth = document.documentElement.clientWidth;
				windowHeight = document.documentElement.clientHeight;
			} else if (document.body) {
				windowWidth = document.body.clientWidth;
				windowHeight = document.body.clientHeight;
			}
			if (yScroll < windowHeight) {
				pageHeight = windowHeight;
			} else {
				pageHeight = yScroll;
			}
			if (xScroll < windowWidth) {
				pageWidth = xScroll;
			} else {
				pageWidth = windowWidth;
			}
			arrayPageSize = new Array(pageWidth, pageHeight, windowWidth, windowHeight);
			return arrayPageSize;
		};

		function ___getPageScroll() {
			var xScroll, yScroll;
			if (self.pageYOffset) {
				yScroll = self.pageYOffset;
				xScroll = self.pageXOffset;
			} else if (document.documentElement && document.documentElement.scrollTop) {
				yScroll = document.documentElement.scrollTop;
				xScroll = document.documentElement.scrollLeft;
			} else if (document.body) {
				yScroll = document.body.scrollTop;
				xScroll = document.body.scrollLeft;
			}
			arrayPageScroll = new Array(xScroll, yScroll);
			return arrayPageScroll;
		};

		function ___pause(ms) {
			var date = new Date();
			curDate = null;
			do {
				var curDate = new Date();
			} while (curDate - date < ms);
		};
		return this.unbind('click').click(_initialize);
	};
})(jQuery);