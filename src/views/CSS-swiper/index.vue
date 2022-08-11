<template>
  <div class="container">
    <div
      class="container__item"
      v-for="item in colorList"
      :style="{ background: item }"
      :key="item"
    ></div>
  </div>
</template>

<script setup>
// 纯CSS实现轮播图
// 当然只有轮播的效果，没法切换...

const colorList = ["red", "green", "yellow", "blue", "black"];
</script>

<style lang="scss" scoped>
.container {
  height: 500px;
  width: 1000px;
  display: flex;
  overflow: hidden;
}

@keyframes move-left {
  /* 所以其实关键是用CSS设置每张图片的偏移，毕竟没法用JS动态计算，那么有几张图
     就要设置几次..
  */
  0% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-1000px);
  }
  40% {
    transform: translateX(-2000px);
  }
  60% {
    transform: translateX(-3000px);
  }
  80% {
    transform: translateX(-4000px);
  }
  100% {
    transform: translateX(-5000px);
  }
}
.container__item {
  height: 100%;
  width: 1000px;
  flex-shrink: 0;
  animation: move-left 10s infinite alternate-reverse;
}
</style>
