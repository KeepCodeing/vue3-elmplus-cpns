import { createRouter, createMemoryHistory } from "vue-router";

import Container from "../components/container/index.vue";

const routes = [{ path: "/asdf", component: Container }];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
