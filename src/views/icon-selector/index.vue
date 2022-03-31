<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true"
      >图标选择器</el-button
    >
    <icon-dialog
      @change-visible="handleClose"
      :dialog-visible="dialogVisible"
      :title="'图标选择器'"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import IconDialog from "./components/dialog.vue";

export default {
  components: {
    IconDialog,
  },
  setup() {
    const dialogVisible = ref(false);

    const handleClose = () => {
      dialogVisible.value = false;
    };

    return {
      dialogVisible,
      handleClose,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>