import { createApp } from "vue";

import VueRouter from "./router";
import App from "./App.vue";
import * as ElIcons from "@element-plus/icons-vue";

import "element-plus/dist/index.css";

const app = createApp(App);

for (const icon in ElIcons)
  app.component(
    `i${icon.replace(/([A-Z])/g, "-$1").toLowerCase()}`,
    ElIcons[icon]
  );

app.use(VueRouter).mount("#app");
