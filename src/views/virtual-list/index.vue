<template>
  <div class="container" ref="container" @scroll="loadData">
    <ul
      class="list-container"
      :style="{ transform: `translateY(${startTop}px)` }"
    >
      <li class="list-item" v-for="item in listItems" :key="item">
        {{ item }}
      </li>
    </ul>
    <div :style="{ height: `${LIST_SIZE}px` }"></div>
  </div>
  <div style="width: 400px; height: 100px; background: red">
    <div
      style="
        width: 100px;
        height: 100%;
        float: left;
        overflow: hidden;
        background: green;
      "
    ></div>
    <div style="margin: 0 100px">asdf</div>
    <div
      style="
        width: 100px;
        height: 100%;
        float: right;
        overflow: hidden;
        background: green;
      "
    ></div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const container = ref(null);
const list = ref(Array.from({ length: 50 }, (_, idx) => idx));

const ITEM_SIZE = 50 + 20; // height + margin

const listItems = ref(list.value.slice(0, 15));

const LIST_SIZE = ref(ITEM_SIZE * list.value.length);

const throttle = (fn, limit = 50) => {
  let lastTime = 0;

  return (...arg) => {
    const now = new Date().getTime();

    if (now - lastTime > limit) {
      fn(...arg);
      lastTime = now;
    }
  };
};

const startTop = ref(0);

// 不是很好使用节流，因为快速滚动需要快速响应，用了节流就会有DOM元素闪烁的问题
const loadData = throttle((event) => {
  const { target } = event;
  const { scrollTop, clientHeight } = target;

  // 因为实际上的高度还有内外边距之类的因素所以算出来的不一定完全准确
  // 可能会多出来一些，这时可以选择加上偏差，不加可以起到预加载的效果
  let start = Math.ceil(scrollTop / ITEM_SIZE);
  let end = start + Math.ceil(clientHeight / ITEM_SIZE);
  // if (end >= list.length) end = list.length - 1;

  listItems.value = list.value.slice(start, Math.min(end, list.value.length));

  // console.log(list.value.slice(start, end + 1));

  // 这个scrollTop直接用来做偏移量就比较精准了，没必要再算一遍
  startTop.value = scrollTop;

  console.log(start, end);
}, 0);
</script>

<style lang="scss" scoped>
.container {
  height: 700px;
  background: red;
  width: 500px;
  padding: 10px 0;
  overflow-y: scroll;
  border-radius: 10px;
  position: relative;
}
.list-container {
  list-style-type: none;
  left: 10px;
  right: 10px;
  top: 10px;
  bottom: 10px;
  position: absolute;
}
.list-item {
  height: 50px;
  background: green;
  margin: 10px 0;
  border-radius: 10px;
  color: white;
  text-align: center;
  font-size: 20px;
  font-weight: bolder;
  line-height: 50px;
}
</style>

<script>
// 虚拟列表
// 它解决了大量数据下滚动造成的DOM元素过多导致页面卡顿的问题
// 可以认为是无限滚动的加强版，因为前者数据越多DOM就越多，而
// 虚拟列表只会渲染可视区内的DOM元素，因此具有更佳的性能

// 看到需求可以先考虑下面几个问题：
// 1. 可视区元素的定义，溢出元素的定义
// 2. 可视区内该渲染多少个元素
// 3. 既然只渲染可视元素，那如何产生滑动效果

// 首先来考虑问题1
// 根据无限滚动的知识可以知道，可视区的元素就是父容器的clientHeight
// 中的元素，而滚动出去的元素就是父容器scrollTop里的元素，知道滚动
// 出去多少个元素，同时知道可视区内最多能渲染多少个元素，我们就能解决
// 问题2了

// 接下来是问题2
// 那么我们假设每个子元素高度固定为n，则 start = scrollTop / n 就是滚动出去
// 元素的个数，在可视区域内的元素个数就是 end = start + clientHeight / n 个
// 我们要展示的区间也就是arr[start, end]间的元素

// 最后是问题三，因为我们只渲染clientHeight间的元素，所以是不会产生溢出的
// 这样父元素也就没法滚动了..解决的办法是通过CSS设置translateY偏移，也就是
// 把子元素列表当成一整块根据start位置进行偏移...

// 接下来明确下主体：是父容器决定元素是否出现在可视区内，子元素
// 用来展示数据，那也就是说我们不应该在滚动发生时判断子元素的offsetTop
// < 父元素scrollTop，而是直接根据值（思路不明确，或者说想错地方了w）
</script>
