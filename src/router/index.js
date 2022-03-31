import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/components/container/index.vue"),
    children: [
      {
        path: "/icon-selector",
        component: () => import("@/views/icon-selector/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
