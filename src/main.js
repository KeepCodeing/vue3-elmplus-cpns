import { createApp } from "vue";

import VueRouter from "./router";
import App from "./App.vue";
import * as ElIcons from "@element-plus/icons-vue";

import { format } from "./utils/formatCamel";

import "element-plus/dist/index.css";

import eventBus from "./utils/eventBus";

const app = createApp(App);

for (const icon in ElIcons) app.component(format(icon), ElIcons[icon]);

app.use(VueRouter).use(eventBus).mount("#app");
