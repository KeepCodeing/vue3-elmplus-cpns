<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      @close="$emit('changeVisible', false)"
      :title="title"
      width="30%"
    >
      <dir class="icon-container">
        <div class="icon-item" v-for="icon in Object.keys(ElIcons)" :key="icon">
          <el-icon :size="30"> <component :is="format(icon)" /></el-icon>
          <p class="text">{{ format(icon) }}</p>
        </div>
      </dir>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="$emit('changeVisible', false)">Cancel</el-button>
          <!-- <el-button type="primary" v-on="$attrs">Confirm</el-button> -->
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import * as ElIcons from "@element-plus/icons-vue";
import { format } from "@/utils/formatCamel";

export default {
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
  setup() {
    return {
      ElIcons,
      format,
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