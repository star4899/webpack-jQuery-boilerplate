import './style/style.scss';
import "@/directive";

import Zum from "@/zum-core";
import schema from "@/schema";
import router from "@/router";
import layout from "@/layout";

new Zum({
	schema,
	router,
	layout
});