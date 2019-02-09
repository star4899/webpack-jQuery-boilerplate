const div = `
<div>
	<span>{{title}}</span>
	<span>{{index}}</span>
</div>
`;
const ul = `
<ul class="box-group">
	<li class="title"></li>
	<li class="index"></li>
</ul>
`;

export default {
	data(){
		return {
			
		}
	},
	before(){
		
	},
	after(){
		const self = this;
		$(".tab-box1").tabEvent({
			tabEventName : "mouseenter",
			eventCallback : function(result){
				result.$con.empty();
				result.$con.append($.templateParser(self.templates.p, {
					title : "tab box1 content",
					index : result.index
				}));
			}
		});
		$(".tab-box2").tabEvent({
			eventCallback : function(result){
				result.$con.empty();
				const $ul = self.templates.ul.clone(true);
				$ul.find(".title").text("tab box2 content");
				$ul.find(".index").text(result.index);
				result.$con.append($ul);
			}
		});
		$(".tab-box3").tabEvent({
			defaultActiveIndex : 2,
			eventCallback : function(result){
				result.$con.empty();
				result.$con.append($.templateParser(self.templates.div, {
					title : "tab box3 content",
					index : result.index
				}));
			}
		});
	},
	templates : {
		p : `<p>{{title}}-{{index}}</p>`,
		div,
		ul : $(ul)
	}
};