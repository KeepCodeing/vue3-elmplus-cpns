import { createRouter, createWebHistory } from "vue-router";

export const routes = [
  {
    path: "/",
    component: () => import("@/components/container/index.vue"),
    redirect: "/icon-selector",
    children: [
      {
        path: "/icon-selector",
        component: () => import("@/views/icon-selector/index.vue"),
        meta: {
          title: "图标选择器",
          icon: "i-setting",
        },
      },
      {
        path: "/city-chooser",
        component: () => import("@/views/city-chooser/index.vue"),
        meta: {
          title: "省市区选择器",
          icon: "i-setting",
        },
      },
      {
        path: "trend",
        component: () => import("@/views/trend/index.vue"),
        meta: {
          title: "趋势标记",
          icon: "i-setting",
        },
      },
      {
        path: "notification",
        component: () => import("@/views/notification/index.vue"),
        meta: {
          title: "通知组件",
          icon: "i-setting",
        },
      },
      {
        path: "menu",
        component: () => import("@/views/menu/index.vue"),
        meta: {
          title: "菜单组件",
          icon: "i-setting",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
