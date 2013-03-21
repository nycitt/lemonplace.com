$(function(){
	var APP = {
		init: function(opts){
			var $c = $('#welcome-page');

			var options = {
				minHeight: 544,
				$lemonBg: $('.lemon-bg', $c),
				$lemon: $('.lemon-bg img', $c),
				$navbar: $('.navbar')
			};

			this.options = $.extend(options, opts);

			this._resizePages();

			this._watchScroll();
			this._portfolioMasonry();
			this._infoBoxSetup();
			this._scrollDownButtons();

			setInterval(this._bounceScrollDown, 2000);
		},
		_bounceScrollDown: function(){
			 $('.scroll-down').effect("bounce", { 
			 	times: 20,
			 	distance: 50,
			 }, 3000);
		},
		_scrollDownButtons: function(){
			$('[href="#!/our-work"]').click(function(){
				$(window).scrollTo('#our-work', 'slow');
			});
		},
		_infoBoxSetup: function(){
			$('.portfolio li').hover(
				function(){
					$(this).find('.info').slideDown();
				},
				function(){
					$(this).find('.info').slideUp();
				});
		},
		_portfolioMasonry: function(){
			$('.portfolio').imagesLoaded(function(){
				$(this).masonry({
					columnWidth: function(pageWidth){
						var colWidth = (pageWidth / 2) -10;
						$('.portfolio li').css('width', colWidth);
						return colWidth;
					},
					gutterWidth: 20
				});
			});
		},
		_resizePages: function(){
			var h = $(window).height();
			var height = h < this.minHeight ? this.minHeight : h;
			this.options.pageHeight = height;

			$('.page').css('height', height);
		},
		_watchScroll: function(){
			var o = this.options;

			$(window).scroll(function(e){
				var top = $(document).scrollTop();
				var height =  Math.max(o.minHeight, $(window).height());

				o.oldPage = o.activePage;
				o.activePage = Math.floor((top + (height/2)) / height);

				if(o.oldPage !== o.activePage) {
					$('.page').removeClass('.selected');
					$('.page').eq(o.activePage).addClass('.selected');
				}

				//Animate Lemon
				if(o.activePage == 0) {
					o.$lemonBg.rotate(top);
					o.$lemon.rotate(-top * 2);
				}

				if(top > o.pageHeight) {
					o.$navbar.css('position', 'fixed');
				} else {
					o.$navbar.css('position', 'inherit');
				}
			});
		}
	};

	APP.init();
});