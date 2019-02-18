const ul = `
<ul class="box-group">
	<li class="title"></li>
	<li class="index"></li>
</ul>
`;

export default {
	name : "tab",
	$el : $(".tab-box1"),
	data(){
		return {
			text : "sub-tab text"
		};
	},
	before(){
		// console.log("tab - before");
		// console.log(this.$parent);
	},
	after(){
		const self = this;
		this.$el.tabEvent({
			tabEventName : "mouseenter",
			eventCallback : function(result){
				const d = {
					title : $(result.self).text(),
					index : result.index
				};
				result.$con.empty();
				const ul = self.templates.ul.clone()
				ul.find(".title").text(d.title).end().find(".index").text(d.index);
				result.$con.append(ul);
			}
		});
	},
	templates : {
		ul : $(ul)
	}
};