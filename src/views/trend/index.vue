<template>
  <div>
    <trend :reverseColor="true" :upTextColor="'red'" :text="' 产品销量 '">
    </trend>
    <trend :trend-type="false" :reverseColor="true" :downTextColor="'green'">
      营收利润
    </trend>
  </div>
</template>

<script>
import Trend from "./components/trend.vue";

export default {
  components: {
    Trend,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>