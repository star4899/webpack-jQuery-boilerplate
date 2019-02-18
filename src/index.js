import './style/style.scss';
import "@/directive";

import skydown from "@/core";
import schema from "@/schema";
import router from "@/router";
import layout from "@/layout";

new skydown({
	schema,
	router,
	layout
});