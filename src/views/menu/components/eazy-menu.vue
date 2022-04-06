<template>
  <div>
    <infinite-menu :menuList="menuList" />
  </div>
</template>

<script>
import InfiniteMenu from "./infinite-menu"
export default {
  components: {
    InfiniteMenu
  },
  setup() {
    const menuList = [
      { title: "menu-1", icon: "i-setting" }
    ]

    return { menuList }
  }
}
</script>

<style lang="scss" scoped>
</style>