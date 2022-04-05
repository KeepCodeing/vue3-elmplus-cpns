<template>
  <div>
    <el-row style="margin: 0 0 20px 0;" v-for="item in listData" :key="item.title">
      <el-col style="text-align: center;" v-if="listConfig.avatar" :span="6">
        <el-avatar :src="listData.avatar" />
      </el-col>
      <el-col :span="12">
        <h3>{{ item.title }}</h3>
        <p>{{ item.time }}</p>
      </el-col>
      <el-col v-if="listConfig.tag" :span="6">{{ item.tag }}</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    listConfig: {
      type: Object,
      default: () => ({})
    },
    listData: {
      type: Array,
      default: () => []
    }
  },
  setup() {


    return {}
  }
}
</script>

<style lang="scss" scoped>
</style>