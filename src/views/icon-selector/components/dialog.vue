<template>
  <div class="my_overload_css">
    <el-dialog
      v-model="dialogVisible"
      @close="closeDialog"
      :title="title"
      width="30%"
      :lock-scroll="false"
    >
      <dir class="icon-container">
        <div
          class="icon-item"
          @click="copyIcon(icon)"
          v-for="icon in Object.keys(ElIcons)"
          :key="icon"
        >
          <el-icon :size="30"> <component :is="format(icon)" /></el-icon>
          <p class="text">{{ format(icon) }}</p>
        </div>
      </dir>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import * as ElIcons from "@element-plus/icons-vue";
import { format } from "@/utils/formatCamel";
import { useCopy } from "@/hooks/useCopy";

export default {
  emits: ["changeVisible"],
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
      default: false,
    },
    title: {
      type: String,
      required: false,
      default: "",
    },
  },
  setup(props, { emit }) {
    const closeDialog = () => emit("changeVisible", false);

    const copyIcon = (icon) => {
      useCopy(format(icon));
      closeDialog();
    };

    return {
      ElIcons,
      format,
      closeDialog,
      copyIcon,
    };
  },
};
</script>

<style lang="scss" scoped>
.icon-container {
  display: flex;
  flex-wrap: wrap;

  .icon-item {
    text-align: center;
    margin: 20px 0;
    width: 20%;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
  }
}

.el-dialog__body {
  overflow-y: scroll;
  height: 500px;
}
</style>