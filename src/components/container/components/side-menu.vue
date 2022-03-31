<template>
  <el-menu :collapse="isFold" class="el-menu-vertical-demo">
    <el-menu-item index="1">
      <el-icon>
        <i-setting />
      </el-icon>
      <span>Navigator Four</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
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
    return {};
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