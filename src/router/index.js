import routers from "./routers";

export default function(){
	let pathItem;
	if(Array.isArray(routers)){
		$.each(routers, (index, item) => {
			if(item.path === location.pathname){
				pathItem = item;
				return false;
			};
		});
	}else{
		throw Error("routers Error!!!");
	};
	return pathItem;
};