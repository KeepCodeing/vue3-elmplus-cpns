<template>
  <div>
    <slot v-if="isSlot" :style="{ color: textColor }"></slot>
    <span v-else :style="{ color: textColor }">
      {{ text }}
    </span>
    <el-icon :color="iconColor">
      <component :is="trendType ? upIcon : downIcon" />
    </el-icon>
  </div>
</template>

<script>
import { useSlots, computed } from "vue";
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
    trendType: {
      type: Boolean,
      default: true,
    },
    upIcon: {
      type: String,
      default: "i-arrow-up",
    },
    downIcon: {
      type: String,
      default: "i-arrow-down",
    },
    upIconColor: {
      type: String,
      default: "green",
    },
    downIconColor: {
      type: String,
      default: "red",
    },
    reverseColor: {
      type: Boolean,
      default: false,
    },
    upTextColor: {
      type: String,
      default: "black",
    },
    downTextColor: {
      type: String,
      default: "black",
    },
  },
  setup(props) {
    const slots = useSlots();
    const isSlot = slots.default;

    const iconColor = computed(() => {
      if (props.reverseColor && props.trendType) return props.downIconColor;
      if (props.reverseColor && !props.trendType) return props.upIconColor;

      if (props.trendType) return props.upIconColor;
      if (!props.trendType) return props.downIconColor;
    });

    const textColor = computed(() =>
      props.trendType ? props.upTextColor : props.downTextColor
    );
    return {
      isSlot,
      iconColor,
      textColor,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>