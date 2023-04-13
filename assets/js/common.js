/**
* Pub Common
* -----------------------------------------
*/

(function(context) {
	"use strict";
	var Pub = Pub || {}
	Pub.version = "0202.1600"
	Pub.testFlag = true;
	Pub.pageLoadCnt = 0; //초기 Loaded 아닌  ajax Loaded 카운트 체크
	Pub.is_mobileSize = 0;
	Pub.is_firstLoad = true;
	Pub.is_main = false;
	Pub.util = {
		isValid : function(variables) {
			if (variables == null || variables == undefined || variables === '' || variables == 'undefine') return false;
			else return true;
		}
		, browserCheck : function(){
			var userAgent = navigator.userAgent;
			var $elem = $('html');
			var ieMode = document.documentMode || 0;

			if(ieMode){//IE 전용
				$elem.addClass('ie ie'+ieMode);
			}
			if(userAgent.indexOf("Firefox") > 0){
				$elem.addClass('firefox');
			}else if(userAgent.indexOf("Opera") > 0){
				$elem.addClass('opera');
			}else if(userAgent.indexOf("Chrome") > 0){
				$elem.addClass('chrome');
			}else if(userAgent.indexOf("Safari") > 0){
				$elem.addClass('safari');
			}
		}
		, scrollCheck : function(_callback){
			var
				intervalID
				, cnt = 0
				, tmp = 0
				, flag = false
				, aniSpeed = 360
			;
			var scrollEndCheck=function(_callback){
				clearInterval(intervalID);
				intervalID=setInterval(function(){
					if(tmp == cnt){
						clearInterval(intervalID);
						cnt = 0;
						tmp = 0;
						if(_callback) _callback();
						setTimeout(function(){
							flag = false;
						}, aniSpeed);
					}
					tmp = cnt;
				},200);
			};
			$(window).scroll(function(event) {
				cnt++;
				if(!flag) {
					flag = true;
					scrollEndCheck(_callback);
				}
			});
		}
		, resizeCheck : function(_callback){
			var
				intervalID
				, cnt = 0
				, tmp = 0
				, flag = false
				, delay = 600
			;
			var check=function(){
				clearInterval(intervalID);
				intervalID = setInterval(function(){
					if(tmp == cnt){
						clearInterval(intervalID);
						cnt=0;
						tmp=0;
						if(_callback) _callback();
						setTimeout(function(){
							flag = false;
							return false;
						}, delay);
					}
					tmp = cnt;
				},200);
			};
			$(window).resize(function(event) {
				cnt++;
				if(!flag) {
					flag = true;
					check();
				}
			});
		}
		, version : function(){
			var version = Pub.version;
			$('html').attr('data-pub-version', version);
		}
	}

	context.Pub = Pub;
})(window);



/**
* UI Setup
* -----------------------------------------
*/
var UI = (function(){
	var jMap = {}
	, vMap = {}
	, hMap = {}
	, setMap = function(){
		jMap = {
			html : $('html')
			, body : $('body')
			, wrapper : $('.wrapper')
			, sidebar : $('.sidebar')
			, header : $('#header')
			, navbar  : $('.navbar')
			, navbarLocation  : $('.navbar-location')
			, content : $('.content')
			, modal : $('.modal')
			, footer : $('.footer')
			, dimm : $('.dimm-layer.close-layer')
		}
		, vMap = {
			loginFlag : false
			, is_pop : false
			, is_spliter : false
			, sidebarToggle : false
			, sidebarToggleMo : false

			, BREAK_POINT_MO : 766 //tablet > mobile Point
			, BREAK_POINT_TABLET : 1080 //pc -> tablet Point
			, BREAK_POINT_PC : 1200 //pc -> 
			, BREAK_POINT_MAX : 1920 //pc Wide

			, SIDEBAR_WIDTH : 250

			, curScroll : 0 // 현재 스크롤 값 저장
		}
		, hMap ={
			dimm : '<div class="close-layer dimm-layer"></div>'
		}
	}
	, navbar = {
		init : function(){
			//추후 접근성 스크립트 추가 예정
			this.eventHandler();
			$(window).scroll(this.scrollHandler);
		}
		, eventHandler : function(){
			var $navbar = jMap.navbar
				, $logo = $navbar.find('.logo')
				, $gnb = $navbar.find('.navbar-gnb')
				, $gnbBg = $navbar.find('.gnb-bg')
				, $dep1Block = $gnb.find('.nav.gnb')
				, $dep1 = $dep1Block.find('> li')
				, $dep2Block = $dep1Block.find('.collapse .nav')
			;

			var overNum = -1;

			$('>li > a', $dep1Block).bind('focusin mouseenter', function(){
				overNum = $(this).parent().index();

				$navbar.addClass('over');
				$dep2Block.addClass('show');

				$dep1.removeClass('over') 
				$(this).parent().addClass('over');
			});

			$('>li > a', $dep2Block).bind('focusin mouseenter', function(){
				var $dep1Obj = $(this).closest('.collapse').parent();
				overNum = $dep1Obj.index();

				$dep1.removeClass('over');
				$dep1Obj.addClass('over');
			});

			$navbar.bind('mouseleave',function(){
				$navbar.removeClass('over');
				$dep1.removeClass('over');
				$dep2Block.removeClass('show');
			});

			//MO-size Location Dropdown
			var $location = jMap.navbarLocation.find('.location-wrap >div.active');
			var $locationTitle = jMap.navbarLocation.find('h3 > a');
			var locNum = $location.find('.nav > li').length;
			var locationH = $location.height();

			$locationTitle.on('click', function(){
				//(메뉴갯수 * 메뉴높이) + pad + headerH + boxshadowPad
				var _height = (locNum * 35) + 30 + 56 + 20;
				$location.toggleClass('down');
				if($location.hasClass('down')) $location.css({height : _height})
				else $location.css({height : locationH})
			});

			$(window).resize(function(){
				$location.removeClass('down').removeAttr('style');
			})
		}
		, scrollHandler : function(){
			var scrollTop = $(window).scrollTop()
				, offsetY = window.pageYOffset || document.documentElement.scrollTop
				, headerH = jMap.header.height()
			;

			//MO-size
			if(Pub.is_mobileSize){
				// console.log('is_mobileSize')
			}
			//PC-size
			else{
				// scroll Down ↓
				if (offsetY > vMap.curScroll ) {
					if( scrollTop > headerH){
						jMap.header.addClass('active'); //header top position
					}
					jMap.navbarLocation.find('.location-wrap >div.active').addClass('down');
				}
				// scroll Up ↑
				else{
					jMap.header.removeClass('active');

					if(scrollTop<headerH){
						jMap.navbarLocation.find('.location-wrap >div.active').removeClass('down');
						jMap.header.removeClass('fix');
					}
				}
			}// End of PC-size

			vMap.curScroll = offsetY <= 0 ? 0 : offsetY;
		}
	}
	, sidebar = {
		// PC 모드 : sidebar-toggle (Default : Open)
		// Mo 모드 : sidebar-toggle-mo (Default : Close)
		init : function(){
			sidebar.set();
			sidebar.dimm();
			sidebar.handler();
			sidebar.watch();
			// sidebar.active();
		}
		, set : function(){
			var $depth1 = jMap.sidebar.find('.sidebar-body > .nav');
			var $all_list = $depth1.find('li');
			var $depth1_list = $depth1.find('> li');

			$depth1_list.each(function(i){
				$(this).find('> a').on('click', function(){
					$depth1_list.removeClass('active')
					$depth1_list.find('.collapse').removeClass('show')
					$(this).parent().addClass('active');
					$(this).parent().find('> .collapse').addClass('show');
				})
			});
		}
		, dimm : function(){
			var $dimm = $('<div class="sidebar-dimm"></div>');
			if (jMap.body.find('.main-panel').length != 0) {
				$dimm.appendTo(jMap.body);
			}
		}
		, watch : function(){
			Pub.util.resizeCheck(function(){
				var $dimm = $('.sidebar-dimm');
				if(Pub.is_mobileSize || Pub.is_tabletSize){
					// jMap.html.removeClass('sidebar-toggle'); //PC reset
				}
				else{
					jMap.html.removeClass('sidebar-toggle-mo'); //MO reset
					$dimm.removeClass('visible');
				}
			});
		}
		, handler : function(){
			var $dimm = $('.sidebar-dimm');
			$('#sidebarToggleBtn').click(function() {
				jMap.html.addClass('sidebar-toggle-mo');
				$dimm.toggleClass('visible');
			});

			$dimm.click(function() {
				jMap.html.removeClass('sidebar-toggle-mo');
				$dimm.removeClass('visible');
			});
			$('.btn-sidebar-close').click(function(){
				$dimm.trigger('click');
			});
		}
	}
	, page = {
		init : function(){
			//onLoad(초기 로드), cpLoad(contentPage 로드)
			if(jMap.html.hasClass('onLoad')) {
				Pub.is_firstLoad = false;
				jMap.html.removeClass('cpLoad'+Pub.pageLoadCnt);
				Pub.pageLoadCnt ++;
				jMap.html.addClass('cpLoad'+Pub.pageLoadCnt);
			} else {
				jMap.html.addClass('onLoad');
				Pub.util.browserCheck();
			}
			//Page TYPE
			if(jMap.wrapper.hasClass('cate_main')) Pub.is_main = true;

			//page Class 갯수
			var $page = jMap.body.find('.page');
			if($page.length > 1){
				$page.eq(0).addClass('sc-first')
				$page.eq(-1).addClass('sc-last')
			}
		}
	}
	, browserResize ={
		watch : function(){
			browserResize.init();
			Pub.util.resizeCheck(browserResize.init);
		}
		, init : function(){
			if ($(window).width() <= vMap.BREAK_POINT_MO) { //Mobile Size
				jMap.html.addClass('mo-size').removeClass('tablet-size').removeClass('pc-size pc-wide');
				Pub.is_mobileSize = true;
				Pub.is_tabletSize = false;
				Pub.is_pcSize = false;
			} else if ($(window).width() <= vMap.BREAK_POINT_TABLET) { //Tablet Size
				jMap.html.addClass('tablet-size').removeClass('pc-size pc-wide').removeClass('mo-size');
				Pub.is_mobileSize = false;
				Pub.is_tabletSize = true;
				Pub.is_pcSize = false;
			} else if ($(window).width() <= vMap.BREAK_POINT_PC) { //PC Size
				jMap.html.addClass('pc-size').removeClass('pc-wide mo-size').removeClass('tablet-size');
				Pub.is_mobileSize = false;
				Pub.is_tabletSize = false;
				Pub.is_pcSize = true;
			} else{// PC Size
				jMap.html.addClass('pc-size pc-wide').removeClass('mo-size').removeClass('tablet-size');
				Pub.is_mobileSize = false;
				Pub.is_tabletSize = false;
				Pub.is_pcSize = true;
			}
		}
	}
	, tab = {
		swiper : function($_tab,  _callback){
			var $this =$_tab;

			if(!$_tab.hasClass('tab-swiper')) return false;
			var swiper = new Swiper($this, {
				slidesPerView: 'auto',
				scrollbar: {
					el: '.swiper-scrollbar',
					hide: true,
				},
			});
			if(_callback) _callback();
			return false;
		},
		trigger : function(){
			$('a[data-toggle="pill"]').on('shown.bs.tab', function(e) {
				if($('.tb-con-res').length) setTblHeight();
			});
		}
	}
	, accordion ={
		init : function(){
			var $target = $('.toggle-list-wrap');
			if($target.length >0){
				if($target.hasClass('toggle-type')){
					this.solo();
				}else{
					this.all();
				}
			}
		}
		, all : function(){
			$('.toggle-list-wrap').each(function(){
				var $target = $(this);
				var $lis = $(this).find('li');
				var $a = $lis.find('> dl > dt > a');

				//init
				if($lis.hasClass('active')) $lis.find('.tg-cont-item').slideDown();
				$a.on('click', function(){
					var _parent = $(this).parent().parent().parent();
					if(_parent.hasClass('active')){
						_parent.removeClass('active').find('.tg-cont-item').slideUp();
					}else{
						_parent.addClass('active').siblings().removeClass('active').find('.tg-cont-item').slideUp();
						_parent.find('.tg-cont-item').slideDown();
					}
					return false;
				});
			});
		}
		, solo : function(){
			$('.toggle-list-wrap').each(function(){
				var $target = $(this);
				var $lis = $(this).find('li');
				var $a = $lis.find('> dl > dt > a');

				//init
				if($lis.hasClass('active')) $lis.find('.tg-cont-item').slideDown();

				$a.on('click', function(){
					var _parent = $(this).parent().parent().parent();
					if(_parent.hasClass('active')){
						_parent.removeClass('active').find('.tg-cont-item').slideUp();
					}else{
						_parent.addClass('active').find('.tg-cont-item').slideDown();
					}
					return false;
				});
			});
		}
	}
	, button ={
		fix : function(){
			if($('.btn-fix').length) {
				this.fixHandler();
				$(window).scroll(this.fixHandler);
			}
		}
		, fixHandler : function(){
			var scrollTop = $(window).scrollTop()
				, offsetY = window.pageYOffset || document.documentElement.scrollTop
				, headerH = jMap.header.height()
				, offsetFooter = $('.footer').offset().top - $(window).height() - 61
			;
			if(scrollTop > headerH && scrollTop < offsetFooter){
					jMap.body.addClass('ui-btn-fix');
			} else{
				jMap.body.removeClass('ui-btn-fix');
			}
		}
	}
	, init = function(_param){
		setMap();
		if(_param) vMap.loginFlag  = _param.loginFlag;
		page.init();
		//Common
		accordion.init();
		button.fix();

		//공통 & 최초 로드시
		if(Pub.is_firstLoad){
			if($('.sidebar').length) sidebar.init();
			if($('.navbar').length) navbar.init();
			$(window).resize(function(){
				browserResize.init();
				if($('.tb-con-res').length) setTblHeight();
			}).resize();
			modalHandler();
		}
	};

	return {
		init : init
		, navbar : navbar.init
		, sidebar : sidebar.init
		, tabSwiper : tab.swiper
		, tabSwiper : tab.trigger
		, btnFix : button.fix
	}
})();



/**
* 레이어 컨트롤
* -----------------------------------------
*/
function modalHandler(){
	var ZINDEX_DEFAULT_BACK = 8000;
	var ZINDEX_DEFAULT = 8010;
	var $body = $('body');

	//모달이 닫힐때
	$('.modal').on('hide.bs.modal', function () {
		var $back= $('.modal-backdrop');
		var zindex = Number($body.attr('data-modal-cnt')) - 3 ;
		if(ZINDEX_DEFAULT < zindex) {
			$back.last().prev().css("z-index", zindex );
		}
	});

	//모달이 닫히고 난뒤
	$('.modal').on('hidden.bs.modal', function () {
		var $back= $('.modal-backdrop');
		var zindex = Number($body.attr('data-modal-cnt')) - 2;

		if(ZINDEX_DEFAULT > zindex) {
			$body.removeAttr('data-modal-cnt').removeClass('modal-open');
			$back.remove();
		} else {
			$body.addClass('modal-open').attr('data-modal-cnt', zindex);
			$back.last().css("z-index", zindex - 1);
		}
	});

	// 모달이 열릴때 
	$('.modal').on('show.bs.modal', function () {
		var $modal = $(this);
		var $back= $('.modal-backdrop');
		var zindex = $body.attr('data-modal-cnt') ? Number($body.attr('data-modal-cnt')) + 2 : ZINDEX_DEFAULT;

		$body.attr('data-modal-cnt', Number(zindex));
		$modal.css('z-index' , zindex);
		$back.last().css("z-index", zindex - 1); //back
	});

	//모달이 열리고 난뒤
	$('.modal').on('shown.bs.modal', function () {
		var $modal = $(this);
		var $back= $('.modal-backdrop');
		var zindex_back = $body.attr('data-modal-cnt') ? Number($body.attr('data-modal-cnt')) - 1 : ZINDEX_DEFAULT_BACK;
		$back.css("z-index", ZINDEX_DEFAULT_BACK);//모든 back zindex를 8000
		$back.removeClass('last')
		$back.last().addClass('last').css("z-index", zindex_back); //마지막만 modal보다 한단계 아래로
	});
}


/**
* iframe :: 높이 조절
* -----------------------------------------
*/
function iframeHandler(){
	var $iframe = $('.iframe-item');
	if($iframe.length > 0){
		$(window).resize(function(){
			var winH = $(window).height()
				headerH = $('#header').outerHeight()
				footerH = $('.footer').outerHeight()
				calH = winH - (headerH + footerH) 
			;
			$('.content').css({'padding-bottom'  : 0 })
			$iframe.css({'height' : calH});
		}).resize();
	}
}

function iframeHandler_modal(){
	var $iframe = $('.iframe-item');
	if($iframe.length > 0){
		$(window).resize(function(){
			var winH = $(window).height()
				headerH = $('.modal-header').outerHeight()
				calH = winH - (headerH)
			;
			if(! $('.wpop').hasClass('iframe-full')) {
				calH = calH - 70; //modal-body 위아래 여백
			}
			$iframe.css({'height' : calH});
		}).resize();
	}
}
/** 
* 반응형테이블 높이값 유동적 조절
* -----------------------------------------
*/
function setTblHeight() {
	if (!$('html').hasClass('mo-size')) {
		$('.tb-con-res .tb4 dd').each(function(idx, item){
			$(item).removeAttr('style');
			$(item).closest('ul').find('dd').css({'height': $(item).outerHeight() , 'min-height': '60px'});
		})
	} else {
		$('.tb-con-res dd').css({'min-height': '50px', 'height':'auto'});
	}
}
/**
* 스크롤 중앙이동
* -----------------------------------------
*/
var scrollUI = {
	center: function(el){
		var $parent = $(el).parent(),
			$parentWidth = $parent.outerWidth(),
			$parentScrollW = $parent.get(0).scrollWidth,
			$thisLeft = $(el).position().left,
			$thisWidth = $(el).outerWidth(),
			$scrollLeft = $thisLeft - ($parentWidth/2) + ($thisWidth/2),
			$speed = Math.max(300,Math.abs($scrollLeft * 2));
		if($parentWidth < $parentScrollW)$parent.animate({'scrollLeft':'+='+$scrollLeft},$speed);
	}
};
/**
* 텍스트 변경
* -----------------------------------------
*/
var changeTxt = function(target, beforeTxt, afterTxt){
	return $(target).each(function(){
		var $el = $(this);
		$el.html($el.html().split(beforeTxt).join(afterTxt));
	});
};
/**
* body scroll lock
* -----------------------------------------
*/
var Body = {
	scrollTop :'',
	lock: function(){
		if(!$('html').hasClass('lock')){
			Body.scrollTop = window.pageYOffset;
			$('#wrapper').css('top',-(Body.scrollTop));
			$('html').addClass('lock');
		}
	},
	unlock: function(){
		$('html').removeClass('lock');
		$('#wrapper').removeAttr('style');
		window.scrollTo(0, Body.scrollTop);
		window.setTimeout(function (){
			Body.scrollTop = '';
		}, 0);
	}
};
//=====================
/**
* 스크린안에 있는지 확인
* -----------------------------------------
*/
var isScreenIn = function(target, add){
	if(add == undefined)add = 0;
	var $window = $(window),
		$wHeight = $window.height()+add,
		$scrollTop = $window.scrollTop(),
		$winBottom = ($scrollTop + $wHeight);
	var $el = $(target),
		$elHeight = $($el).outerHeight(),
		$elTop = $($el).offset().top,
		$elCenter = $elTop + ($elHeight/2),
		$elBottom = $elTop + $elHeight;

	if(($elCenter >= $scrollTop) && ($elCenter <= $winBottom)){
		return true;
	}else{
		return false;
	}
}
/**
* scroll motion
* -----------------------------------------
*/
$.fn.scrollAni = function(){
	return this.each(function(i){
		var $this = $(this), _d = 0;
		$this.hasClass('delay') ? _d = 100 : _d = 0;
		$(window).scroll(function(){
			if(isScreenIn($this, 200)){
				setTimeout(function() {
					$this.addClass('animated');
				}, _d*i);
			}
		});
		$(window).scroll();
	});
};
/**
* 숫자만
* -----------------------------------------
*/
var onlyNumber = function(num){
	return num.toString().replace(/[^0-9]/g,'');
};
/**
* 콤마넣기
* -----------------------------------------
*/
var addComma = function(num){
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
};
/**
* 애니메이트숫자 : ex) animateNumber('.number','123',1000,true,true,1000);
* -----------------------------------------
*/
var animateNumber = function(target,number,speed,isComma,useScroll,setTime){
	return $(target).each(function(){
		var $this = $(this);
		if(number == '')number = $this.text();
		var $number = onlyNumber(number);
		if(speed == undefined)speed = 500;
		if(isComma == undefined)isComma = false;
		if(useScroll == undefined)useScroll = false;
		if(setTime == undefined)setTime = false;
		var animateInit = function(){
			$({now:0}).stop(true,false).animate({now:$number},{
				duration: speed,
				step: function(now,e){
					if(isComma){
						$this.text(addComma(Math.floor(now)));
					}else{
						$this.text(Math.floor(now));
					}
				}
			});
			$this.data('first',false);
		}
		if(useScroll){
			$this.data('first',true);
			$(window).scroll(function(){
				if($this.data('first') && isScreenIn($this) && setTime>0){
					$this.data('first',false);
					setTimeout(function(){
						animateInit();
					},setTime);
				} else if($this.data('first') && isScreenIn($this)){
					animateInit();
				}
			});
			$(window).scroll();
		}else{
			animateInit();
		}
	});
};
/**
* Main UI
* -----------------------------------------
*/
var mainUI = {
	visualSwipe:function(){
		if($('.visual_swipe').length){
			var $this = $('.visual_swipe');
			var width = window.matchMedia ('screen and (max-width: 766px)');
			var indexBannerOptions = {
				slidesPerView: 'auto',
				spaceBetween: 0,
				pagination: {
					el: '.visual_pagination',
					clickable: true,
					renderBullet:function(index, className) {
						return '<button type="button" class="'+className+'"><span class="blind">'+(index+1)+'번째 슬라이드</span></button>';
					}
				},
				speed: 500,
				loop: true,
				autoplay : {delay:6000}
			};
			var visualSlider = new Swiper($this, indexBannerOptions);
			function slider(width) {
				if(width.matches) {
					indexBannerOptions.effect = 'slide';
				} else {
					indexBannerOptions.effect = 'fade';
				}
				visualSlider.destroy (true, true);
				visualSlider = new Swiper ($this, indexBannerOptions);
				var $indicator = $('.visual_pagination>button'),
					$btnControl = $('.indicator>button'),
					$txt = $btnControl.find('.blind');
				visualSlider.autoplay.start();
				$btnControl.removeClass('play').addClass('stop');
				changeTxt($txt,'시작','정지');
			}
			width.addListener(slider);
			slider(width);
			$(document).on('click','.indicator>button',function() {
				var $this = $(this), $txt = $(this).find('.blind');
				if($this.hasClass('stop')){
					visualSlider.autoplay.stop();
					$this.removeClass('stop').addClass('play');
					changeTxt($txt,'정지','시작');
				} else {
					// 04.05 수정
					visualSlider.slideNext();
					setTimeout(function() {
						visualSlider.autoplay.start();
					}, 100);
					$this.removeClass('play').addClass('stop');
					changeTxt($txt,'시작','정지');
				}
			});
		}	
	},
	newsSwipe:function(){
		var _width = $(window).width(),
			breakpoint = window.matchMedia('(max-width:766px)'),
			newsSlider;
		if($('.news_swipe').length){
			var $this = $('.news_swipe');
			var newsOptions = {
				slidesPerView: 1,
				pagination: {
					el: '.news_pagination',
					clickable: true,
					renderBullet:function(index, className) {
						return '<button type="button" class="'+className+'"><span class="blind">'+(index+1)+'번째 슬라이드</span></button>';
					}
				},
				speed: 500,
				breakpoints: {
					766: {
						slidesPerView: 3,
						navigation: {
							nextEl: '.news_next',
							prevEl: '.news_prev'
						}
					},
				}
			};
			newsSlider = new Swiper($this, newsOptions);
		}
	},
	reviewSwipe:function(){
		if($('.review_swipe').length){
			var $this = $('.review_swipe');
			var reviewOptions = {
				slidesPerView: 'auto',
				centeredSlides: false,
				spaceBetween: 15,
				loop: true,
				speed: 500,
				navigation: {
					nextEl: '.review_next',
					prevEl: '.review_prev'
				},
				breakpoints: {
					766: {
						centeredSlides: true,
						spaceBetween: 20,
					},
				}
			};
			var reviewSlider = new Swiper($this, reviewOptions);
		}	
	},
	dsPeopleSwipe:function(){
		if($('.people_swipe').length){
			var $this = $('.people_swipe');
			var dsPeopleOptions = {
				slidesPerView: 1,
				speed: 500,
				navigation: {
					nextEl: '.people_next',
					prevEl: '.people_prev'
				},
			};
			var dsPeopleSlider = new Swiper($this, dsPeopleOptions);
			var chkClick = true;
			$('.swipe_sort_section .sort li button').on('click', function(){
				var $this = $(this), myIndex = $this.parent().index();
				chkClick = false;
				$this.parent('li').addClass('active').siblings('li').removeClass('active');
				dsPeopleSlider.slideTo(myIndex);
				scrollUI.center($this.parent());
			});
			dsPeopleSlider.on('slideChangeTransitionStart', function () {
				var tabIndex = $('.people_swipe').find('.swiper-slide.swiper-slide-active').index();
				if(chkClick){
					scrollUI.center($('.sort li').eq(tabIndex));
				}
				$('.sort li').eq(tabIndex).addClass('active').siblings('li').removeClass('active');
				chkClick = true;
			});
		}	
	},
	dsRecruitNow:function(){
		// 메인 두산채용 Now - 유투브
		var embedURL = ['jbf74JnRsf0', 'RVK4edaHArg', 'L3goqstrl3I'];  //  jbf74JnRsf0 : 1 , RVK4edaHArg : 2, L3goqstrl3I : 3
		var $videoWrap = $('.video-wrap');
		$('.swiper-wrapper').children().each(function() {
			var idx = $(this).index();
			$(this).find('a').on('click', function() {
				$videoWrap.html('<iframe class="youtube" width="560" height="315" src="https://www.youtube.com/embed/' + embedURL[idx] + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
			});
		});
		$('.modal-video .close').on('click', function() {
			$videoWrap.html('');
		});
	},
	posTop:function(){
		var $topBtn = $('.mtop_btn');
		$(window).scroll(function() {
			var btnShowPos = $('.main_item').first().offset().top;
			var halfPos = btnShowPos/2;
			var wScroll = $(this).scrollTop();
			
			if(wScroll >= halfPos) {
				$topBtn.addClass('animated');
			}else {
				$topBtn.removeClass('animated');
			}
		});
		$topBtn.on('click', function() {
			$('html, body').stop().animate({
				scrollTop :0
			}, 500);
		});
	},
	btnMoreCheck:function(){
		var $btnName = $('.recruit'),
			$btnIn = $btnName.closest('.inner');
		if(!$btnName.length){
			 $btnIn.removeClass('pd_recruit');	
		} else {
			 $btnIn.addClass('pd_recruit');
		}
	},
	init : function(){
		mainUI.visualSwipe();
		mainUI.newsSwipe();
		mainUI.reviewSwipe();
		mainUI.dsPeopleSwipe();
		mainUI.dsRecruitNow();
		mainUI.posTop();
		mainUI.btnMoreCheck();
	}
};


