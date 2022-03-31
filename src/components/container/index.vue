<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto">
        <side-menu :is-fold="isFold" />
      </el-aside>
      <el-container>
        <el-header>
          <nav-header @click="changeFold" />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    let isFold = ref(false);

    const changeFold = () => (isFold.value = !isFold.value);

    return {
      changeFold,
      isFold,
    };
  },
};
</script>

<style lang="scss" scoped>
.common-layout,
.el-container {
  height: 100%;
  width: 100%;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
}

.el-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 0;
}
</style>