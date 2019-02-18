export default {
	name : "header",
	$el : $("#header"),
	data(){
		return {
			intervalText : null,
			intervalCursor : null,
			text : "Hi! Tab Component. i'm Header Component!"
		};
	},
	before(){
		this.$el.animate({"z-index" : 10},{
			duration : 1500,
			progress : function(a, p, r){
				var bg = Math.ceil((p * 100) * (255 / 100));
				var color = Math.floor(255 - (255 / 100) * (p * 100));
				$(this).css({
					backgroundColor : "rgb(" + bg + "," + bg + "," + bg + ")"
				});
				$(this).find("h1").css({
					color : "rgb(" + color + "," + color + "," + color + ")"
				});
			}
		});
	},
	after(){
		var self = this;
		var $span = this.$el.find("span");
		this.h1 = {
			text : $span.text(),
			slice : "",
			cnt : 0,
			length : $span.text().length,
			isPlus : true
		};
		function spanTextMotion(){
			if(self.h1.isPlus){
				self.h1.cnt++;
				if(self.h1.text.length <= self.h1.cnt){
					self.h1.cnt = self.h1.text.length;
					self.h1.isPlus = false;
				};
			}else{
				self.h1.cnt--;
				if(self.h1.cnt <= 0){
					self.h1.cnt = 0;
					self.h1.isPlus = true;
					clearInterval(self.intervalText);
					self.intervalCursor = setInterval(function(){
						$span.toggleClass("cursor");
					}, 600);
				};
			};
			$span.text(self.h1.text.slice(0, self.h1.length - self.h1.cnt));
		};
		function intervalText(){
			$span.addClass("cursor");
			clearInterval(self.intervalText);
			clearInterval(self.intervalCursor);
			self.intervalText = setInterval(spanTextMotion, 170);
		};
		this.$el.delay(500).animate({"z-index" : 10},{
			duration : 1500,
			progress : function(a, p, r){
				var bg = Math.floor(255 - (255 / 100) * (p * 100));
				var color = Math.ceil((p * 100) * (255 / 100));
				$(this).css({
					backgroundColor : "rgb(" + bg + "," + bg + "," + bg + ")"
				});
				$(this).find("h1").css({
					color : "rgb(" + color + "," + color + "," + color + ")"
				});
			},
			complete : intervalText
		}).click(intervalText);
	},
	methods : {
		who(){
			console.log(this.text);
		}
	}
}