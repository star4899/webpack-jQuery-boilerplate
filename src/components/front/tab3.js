const ul = `
<ul class="box-group">
	<li class="title"></li>
	<li class="index"></li>
</ul>
`;

export default {
	name : "tab3",
	$el : $(".tab-box3"),
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
		this.$el.tabEvent({
			defaultActiveIndex : 2,
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