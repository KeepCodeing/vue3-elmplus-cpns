<template>
  <el-menu router :collapse="isFold" class="el-menu-vertical-demo">
    <el-menu-item
      v-for="(item, idx) in routes"
      :key="item.path"
      :route="{ path: item.path }"
      :index="idx + ''"
      :class="{
        'is-active': $router.currentRoute.value.path.includes(item.path),
      }"
    >
      <el-icon>
        <component :is="item.meta.icon" />
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { routes } from "@/router";
export default {
  components: {},
  props: {
    isFold: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup() {
    return {
      routes: routes[0].children,
      log: console.log,
    };
  },
};
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>