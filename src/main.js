import { createApp } from "vue";

import VueRouter from "./router";
import App from "./App.vue";

import "element-plus/dist/index.css";

createApp(App).use(VueRouter).mount("#app");
