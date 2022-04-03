<template>
  <div>
    <el-select
      style="margin: 0 20px"
      v-model="province"
      placeholder="请选择省份"
      size="large"
      @change="
        city = '';
        area = '';
      "
      clearable
    >
      <el-option
        v-for="item in Object.keys(cityMap)"
        :key="item"
        :label="item"
        :value="item"
      >
        <span style="float: left">{{ item }}</span>
      </el-option>
    </el-select>
    <el-select
      style="margin: 0 20px"
      v-model="city"
      placeholder="请选择城市"
      size="large"
      :disabled="!province"
      @change="area = ''"
      clearable
    >
      <template v-if="cityMap[province]">
        <el-option
          v-for="item in Object.keys(cityMap[province])"
          :key="item"
          :label="item"
          :value="item"
        >
          <span style="float: left">{{ item }}</span>
        </el-option>
      </template>
    </el-select>
    <el-select
      style="margin: 0 20px"
      v-model="area"
      placeholder="请选择区"
      size="large"
      :disabled="!city"
      clearable
    >
      <template v-if="cityMap[province] && cityMap[province][city]">
        <el-option
          v-for="item in cityMap[province][city]"
          :key="item"
          :label="item"
          :value="item"
        >
          <span style="float: left">{{ item }}</span>
        </el-option>
      </template>
    </el-select>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import cityData from "./pca-code.json";

export default {
  setup() {
    const cityMap = {};

    const province = ref("");
    const city = ref("");
    const area = ref("");

    for (const first of cityData) {
      cityMap[first.name] = {};
      for (const second of first.children) {
        cityMap[first.name][second.name] = {};
        for (const third of second.children) {
          cityMap[first.name][second.name][third.name] = third.name;
        }
      }
    }

    return {
      cityMap,
      province,
      city,
      area,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>