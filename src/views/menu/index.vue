<template>
  <div>
    <infinite-menu />
    <el-menu router>
      <template v-for="(item, idx) in menuList" :key="item.title">
        <!-- 一级菜单：没有子菜单 -->
        <el-menu-item v-if="!item.children">
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <span>{{ item.title }}</span>
        </el-menu-item>
        <!-- 二级菜单：有子菜单 -->
        <el-sub-menu v-if="item.children.length">
          <template #title>
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item v-for="item1 in item.children" :key="item1.title"></el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import InfiniteMenu from "./components/infinite-menu"
export default {
  components: {
    InfiniteMenu
  },
  props: {
    menuList: {
      type: Array,
      default: () => []
    }
  },
  setup() {
  }
}
</script>

<style lang="scss" scoped>
</style>