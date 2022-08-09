<template>
  <div class="container" v-inf-scroll="loadData">
    <div
      class="item"
      :style="{ background: item }"
      v-for="item in itemList"
      :key="item"
    >
      {{ item }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const itemColorList = ["black", "white", "purple", "brown", "yellow"];
const itemList = ref(["green"]);

const sleep = (time = 500) =>
  new Promise((reslove) => setTimeout(reslove, time));

const loadData = async () => {
  const len = itemList.value.length;
  console.log("loadding");
  await sleep(1000);
  itemList.value.push(itemColorList[len % 5]);
};
</script>

<style lang="scss" scoped>
.container {
  height: 500px;
  background: red;
  width: 200px;
  overflow: scroll;
}

.item {
  height: 1000px;
  background: green;
  width: 100%;
}
</style>
