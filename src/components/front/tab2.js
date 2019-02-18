const div = `
<div>
	<span>{{title}}</span>
	<span>{{index}}</span>
</div>
`;

export default {
	name : "tab2",
	$el : $(".tab-box2"),
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
			eventCallback : function(result){
				const d = {
					title : $(result.self).text(),
					index : result.index
				};
				result.$con.empty();
				result.$con.append($.templateParser(self.templates.div, d));

				self.$parent.$parent.layout.header.who()
			}
		});
	},
	templates : {
		div
	}
};