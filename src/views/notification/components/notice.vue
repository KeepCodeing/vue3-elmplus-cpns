<template>
  <div>
    <el-popover placement="bottom" title="Title" :width="200" trigger="click">
      <template #default>
        <slot></slot>
      </template>
      <template #reference>
        <el-badge v-bind="badgeConfig" class="item">
          <slot name="reference"></slot>
        </el-badge>
      </template>
    </el-popover>
  </div>
</template>

<script>
export default {
  props: {
    badgeConfig: {
      type: Object,
      required: true,
      default: () => ({
        value: 0,
        max: 99,
        "is-dot": false,
        type: "primary",
      }),
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>