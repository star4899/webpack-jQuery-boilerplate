export default {
	name : "tab",
	data(){
		return {
		}
	},
	before(){
		// console.log("tab - before");
		// console.log(this.$parent);
	},
	after(){
		const self = this;
		$(".tab-box1").tabEvent({
			tabEventName : "mouseenter",
			eventCallback : function(result){
				const d = {
					title : $(result.self).text(),
					index : result.index
				};
				result.$con.empty();
				result.$con.append($.templateParser(self.templates.p, d));
			}
		});
		// $(".tab-box2").tabEvent({
		// 	eventCallback : function(result){
		// 		const d = {
		// 			title : $(result.self).text(),
		// 			index : result.index
		// 		};
		// 		result.$con.empty();
		// 		result.$con.append($.templateParser(self.templates.div, d));

		// 		// self.$parent.$parent.header.who();
		// 	}
		// });
		// $(".tab-box3").tabEvent({
		// 	defaultActiveIndex : 2,
		// 	eventCallback : function(result){
		// 		const d = {
		// 			title : $(result.self).text(),
		// 			index : result.index
		// 		};
		// 		result.$con.empty();
		// 		const ul = self.templates.ul.clone()
		// 		ul.find(".title").text(d.title).end().find(".index").text(d.index);
		// 		result.$con.append(ul);
		// 	}
		// });
	},
	templates : {
		p : `<p>{{title}}-{{index}}</p>`
	}
};