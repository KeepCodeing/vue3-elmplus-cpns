<template>
  <div>
    <el-progress v-bind="$attrs" :percentage="pro_percent" />
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    animationTime: {
      type: Array,
      default: 0
    },
    percent: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const pro_percent = ref(0);
    const t = (props.animationTime / props.percent) | 0;

    const timer = setInterval(() => {
      pro_percent.value += 1;
      if (pro_percent.value >= props.percent) {
        pro_percent.value = props.percent;
        clearInterval(timer);
      }
    }, t);

    return {
      pro_percent
    }
  }
}
</script>

<style lang="scss" scoped>
</style>