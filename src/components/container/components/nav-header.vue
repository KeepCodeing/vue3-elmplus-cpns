<template>
  <div class="fold-icon" v-on="$attrs">
    <el-icon>
      <i-fold />
    </el-icon>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.fold-icon {
  cursor: pointer;
  padding: 20px;
}
</style>