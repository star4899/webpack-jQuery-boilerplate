export default (function(){
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
				var self = this, $self = $(this), $tab = $self.find(option.tabClass), $content = $self.find(option.contentClass);
				$tab.find("li").each(function(index, item){
					var $item = $(item), $con = $content.children("div").eq(index);
					$item.find("a").on(option.tabEventName, function(e){
						if(!option.isClick) e.preventDefault();
						if(!$item.hasClass(option.tabActiveClass)){
							$item.addClass(option.tabActiveClass).siblings().removeClass(option.tabActiveClass);
							$con.addClass(option.contentActiveClass).siblings().removeClass(option.contentActiveClass);
							option.eventCallback.call(self, {
								index : index,
								self : this,
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
})();