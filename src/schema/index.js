const schema = {
	$el : {
		// only jQuery Object
		type : $
	},
	name : {
		require : true,
		type : String
	},
	data : {
		type : Function
	},
	before : {
		type : Function
	},
	after : {
		type : Function
	},
	components : {
		type : Object
	},
	templates : {
		type : Object
	}
};

module.exports = function(obj){
	const o = obj;
	for(let key in schema){
		const type = schema[key].type.prototype.constructor.name;
		if(schema[key].require && o[key] === undefined) throw Error(`['${key}' Requirement ]`);
		if(o[key]){
			if(o[key].constructor.name !== type) throw Error(`${key} : type error`);
		}else{
			o[key] = schema[key].type();
		};
	};
	return o;
};