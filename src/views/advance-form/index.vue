<template>
  <div></div>
</template>

<script>
// 高级表单
// 基本要求：
// 1. 能根据配置（JS或者JSON）渲染出对应字段的表单，例如
// input、select、checkbox等组件
// 2. 能提供表单重置和表单校验
// 3. 提供一个插槽用来存放表单操作按钮，例如提交和清空

// 核心思路：
// component动态组件
// 通过用户传递进来的配置使用component生成对应组件，要注意input和
// select等组件的区别，后者是可能包括子组件的
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>