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
      {
        path: "progress",
        component: () => import("@/views/progress/index.vue"),
        meta: {
          title: "进度条组件",
          icon: "i-setting",
        },
      },
      {
        path: "city-picker",
        component: () => import("@/views/advance-city-picker/index.vue"),
        meta: {
          title: "城市选择器",
          icon: "i-setting",
        },
      },
      {
        path: "advance-table",
        component: () => import("@/components/advance-table/index.jsx"),
        meta: {
          title: "高级表格",
          icon: "i-setting",
        },
      },
      {
        path: "itech-test",
        component: () => import("@/components/iTeachTest/index.vue"),
        meta: {
          title: "iteach测试",
          icon: "i-setting",
        },
      },
      {
        path: "advance-form",
        component: () => import("@/views/advance-form/index.vue"),
        meta: {
          title: "高级表单",
          icon: "i-setting",
        },
      },
      {
        path: "advance-table-vue",
        component: () => import("@/views/advance-table/index.vue"),
        meta: {
          title: "高级表单(Vue)",
          icon: "i-setting",
        },
      },
      {
        path: "nest-table",
        component: () => import("@/views/nest-table/index.vue"),
        meta: {
          title: "嵌套表格",
          icon: "i-setting",
        },
      },
      {
        path: "infinite-scroll",
        component: () => import("@/views/infinite-scroll/index.vue"),
        meta: {
          title: "无限滚动",
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
