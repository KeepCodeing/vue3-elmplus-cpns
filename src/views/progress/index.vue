<template>
  <div>
    <my-progress stroke-width="40" text-inside :percent="60" :animation-time="3000" />
    <my-progress :percent="60" :animation-time="1500" />
  </div>
</template>

<script>
// 进度条组件其实并没什么东西，就是加载动画的实现...
import MyProgress from './components/progress.vue';
export default {
  components: {
    MyProgress
  },
  setup() {

    return {}
  }
}
</script>

<style lang="scss" scoped>
</style>