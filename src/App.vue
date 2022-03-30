<template>
  <div>
    <container />
  </div>
</template>

<script>
import Container from "@/components/container/index.vue";
export default {
  components: {
    Container,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  /* color: "white"; */
}
html,
body {
  height: 100%;
  width: 100%;
}
</style>