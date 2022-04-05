<template>
  <div>
    <el-popover popper-class="popover" placement="bottom" trigger="click">
      <template #default>
        <slot name="content"></slot>
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

<style lang="scss">
.popover {
  padding: 0 !important;
  width: 400px !important;
}

.el-tabs__nav {
  width: 100%;
  display: flex;
  justify-content: center;
}

.el-tabs__item {
  flex: 1;
  padding: 0;
  text-align: center;
}
</style>