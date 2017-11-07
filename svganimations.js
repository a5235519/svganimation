/*
	
 */
(function ($) {

	$.fn.svganimations = function(obj){
		var defult = $.extend({
			duration: 'duration',   //获取对应path动画时间 "data-duration"
			timing: 'timing',       //获取对应path动画变换速率 "data-timing"
			delay: 'delay'          //获取对应path动画延迟时间 "data-delay"
		},obj);

		var SVGEl = {
			init: function(el,index){
				this.el = index ? el.eq(index-1) : el;
				this.draw();
			},
			draw: function(){
				var _this = this;
				_this.el.find('path').each(function(){
					var _el = $(this);
					var l = _el[0].getTotalLength();
					var duration = _el.data('duration') ? _el.data('duration') : 0;
					var timing = _el.data('timing') ? _el.data('timing') : 'linear';
					var delay = _el.data('delay') ? _el.data('delay') : 0;
					
					// 添加CSS
					_el.css({
						'stroke-dasharray': l+" "+l,
						'stroke-dashoffset': l,
						'-webkit-transition': 'none',
						'-moz-transition': 'none',
						'visibility': 'visible'
					});

					//浏览器触发布局及样式计算
					//动画前获取起始位置
					_el[0].getBoundingClientRect();

					_el.css({
						'-webkit-transition': 'stroke-dashoffset ' + duration + 's ' + timing + ' ' + delay + 's',
						'-moz-transition': 'stroke-dashoffset ' + duration + 's ' + timing + ' ' + delay + 's',
						'stroke-dashoffset': 0
					});
				});
			}
		}

		var isIE = /msie/i.test(navigator.userAgent);
		if(isIE) return false;

		$(this).each(function(){
			var el = $(this);
			SVGEl.init(el,false);
		});

	 	return SVGEl;
	}

})(jQuery);