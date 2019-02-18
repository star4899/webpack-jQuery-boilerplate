;(function(global, factory){
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global.Zum = factory());
}(this, (function(){
	let schema;
	async function createInstance(obj){
		const component = schema(obj);
		const name = component.name;
		this[name] = new component.data();
		component.$el && (this[name].$el = component.$el);
		this[name].$parent = this;
		component.before && await component.before.call(this[name]);
		for(let key in component.methods){
			typeof(component.methods[key]) === "function" && (this[name][key] = component.methods[key]);
		};
		for(let key in component.components){
			createInstance.call(this[name], component.components[key]);
		};
		this[name].templates = component.templates;
		component.after.call(this[name]);
	};
	return function(config){
		schema = config.schema || function(obj){return obj;};
		if(config.router) this.$router = new config.router();
		if(config.layout) createInstance.call(this, config.layout);
		this.$router && createInstance.call(this, this.$router.component);
	};
})));