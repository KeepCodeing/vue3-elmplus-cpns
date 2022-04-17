<template>
  <div>
    <el-popover placement="bottom" @show="visible = true" @hide="visible = false" :width="650" trigger="click">
      <template #reference>
        <el-icon :class="{ 'rotate-icon-up': visible, 'rotate-icon-down': !visible }">
          <i-arrow-down-bold />
        </el-icon>
      </template>
      <template #default>
        <el-row>
          <el-col :span="4">
            <el-button style="width: 100%;">按城市</el-button>
          </el-col>
          <el-col :span="4">
            <el-button style="width: 100%;">按省份</el-button>
          </el-col>
          <el-col :span="13" :offset="1">
            <el-select style="width: 100%;" placeholder="请选择">
              <el-option></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px;" :gutter="10">
          <el-col style="text-align: center; margin: 5px 0;" :span="2" v-for="city in cityList.city"
            :key="city.initial">
            <el-button>{{ city.initial }} </el-button>
          </el-col>
        </el-row>
        <el-scrollbar max-height="500px">
          <el-row style="margin: 20px 0;" v-for="city in cityList.city" :key="city.initial">
            <el-col :span="2">{{ city.initial }}: </el-col>
            <el-col :span="22">
              <el-row>
                <el-col style="margin: 0 0 10px 0;" :span="3" v-for="item in city.list" :key="item.code">
                  <span>{{ item.name }}</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-scrollbar>
      </template>
    </el-popover>
  </div>
</template>

<script>
// 城市选择器，和之前的省市区选择器不一样，这个是一个更加综合的组件，它可以根据
// 首字母分类城市，用户点击后使用弹出层显示城市列表，用户可以通过点击城市名称选择城市
// 总体来说难度不大，不过用到的东西会更多
// 这前面还有时间日期的组件，因为太简单所以鸽了...
import { ref } from 'vue';
import cityList from './city.json';
export default {
  setup() {
    const visible = ref(false);

    return {
      visible,
      cityList,
    }
  }
}
</script>

<style lang="scss" scoped>
.rotate-icon-up {
  transform: rotate(180deg);
}

.rotate-icon-down {
  transform: rotate(0deg);
}

.el-popper {
  height: 500px;
}
</style>