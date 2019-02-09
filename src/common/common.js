module.exports = function(w, d){
	var $w = $(w), $d = $(d);
	async function factory(obj){
		const self = this;
		for(let key in obj){
			const f = obj[key].data || function(){};
			this[key] = new f();
			this[key].$parent = self;
			obj[key].before && await obj[key].before.call(this[key]);
			if(obj[key].methods && typeof(obj[key].methods) === "object"){
				for(let k in obj[key].methods){
					typeof(obj[key].methods[k]) === "function" && (this[key][k] = obj[key].methods[k]);
				};
			};
			if(obj[key].components && typeof(obj[key].components) === "object"){
				factory.call(this[key], obj[key].components);
			};
			obj[key].templates && (this[key].templates = obj[key].templates);
			obj[key].after && obj[key].after.call(this[key]);
		};
	};
	w.skydown = function(obj){
		this.root = this;
		factory.call(this, obj.components);
	};
	$.fn.extend({
		tabEvent(customOption){
			var defaultOption = {
				tabEventName : "click",
				tabClass : ".tab",
				contentClass : ".content",
				
				defaultActiveIndex : 0,
				tabActiveClass : "on",
				contentActiveClass : "on",
				eventCallback(){},
				isClick : false
			};
			return this.each(function(){
				var option = $.extend(true, defaultOption, customOption);
				var $self = $(this), $tab = $self.find(option.tabClass), $content = $self.find(option.contentClass);
				$tab.find("li").each(function(index, item){
					var $item = $(item), $con = $content.children("div").eq(index);
					$item.find("a").on(option.tabEventName, function(e){
						if(!option.isClick) e.preventDefault();
						if(!$item.hasClass(option.tabActiveClass)){
							$item.addClass(option.tabActiveClass).siblings().removeClass(option.tabActiveClass);
							$con.addClass(option.contentActiveClass).siblings().removeClass(option.contentActiveClass);
							option.eventCallback({
								index : index,
								$con : $con
							});
						};
					});
					if(index === option.defaultActiveIndex) $item.find("a").trigger(option.tabEventName);
				});
			});
		}
	});
	$.extend({
		request(config){
			$.ajax({
				url : config.url,
				success(data){
					$.each(data, function(index, item){
						if(item.index === config.index){
							config.callback(item);
							return false;
						};
					});
				},
				error(q,w,e,r){
					console.log(q,w,e,r)
				}
			});
		},
		templateParser(temp, data){
			let r = temp;
			for(let key in data){
				r = r.replace(`{{${key}}}`, data[key]);
			};
			return r;
		}
	});

	// default event binding
	const staticPosition = 163;
	const $wrap = $("#wrap"), $scrollProgress = $("#scroll-progress");
	$w.on("scroll", function(){
		const y = $(this).scrollTop();
		if($wrap.hasClass("mini") || $wrap.hasClass("open")){
			$scrollProgress.css({
				width : ((y / ($d.outerHeight() - w.innerHeight)) * 100) + "%"
			});
		};
		if(y >= staticPosition){
			$wrap.addClass("mini");
		}else{
			$wrap.removeClass("mini");
		};
	});
}(window, document);