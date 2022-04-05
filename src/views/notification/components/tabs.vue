<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane v-for="item in tabList" :key="item.name" :label="item.label" :name="item.name">
        <el-scrollbar max-height="300">
          <list :listConfig="item.listConfig" :listData="item.listData" />
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { ref } from 'vue';
import List from './list.vue'

export default {
  props: {
    tabList: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  components: {
    List
  },
  setup() {

    const activeName = ref("first");
    return {
      activeName
    }
  }
}
</script>

<style lang="scss" scoped>
</style>