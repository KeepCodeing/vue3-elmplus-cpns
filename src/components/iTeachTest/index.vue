<template>
  <div>
    <Menu></Menu>
  </div>
</template>

<script>
import { defineComponent } from 'vue-demi'
import Menu from './menu/index.vue'

export default defineComponent({
  props: {},
  setup() {
    return {
      Menu
    }
  }
})

</script>

<style lang="scss" scoped>
</style>