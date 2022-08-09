<template>
  <div class="container" v-inf-scroll:[stop]="loadData" :loading="loading">
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

let cnt = ref(0);
const stop = ref(false);
const loading = ref(false);
const loadData = async () => {
  const len = itemList.value.length;
  console.log("loadding");

  cnt.value++;
  loading.value = true;

  await sleep(1000);

  if (cnt.value >= 13) {
    stop.value = true;
    return;
  }
  loading.value = false;
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
  height: 100px;
  background: green;
  width: 100%;
}
</style>
