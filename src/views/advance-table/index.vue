<template>
  <div>
    <advance-table :tableProp="tableProp">
      <template #tag="{ scope: { row } }">
        <el-tag>{{ row.name }}</el-tag>
      </template>
      <template #add>
        <span>
          <el-button type="text">增加</el-button>
        </span>
      </template>
    </advance-table>
  </div>
</template>

<script lang="ts">
// 高级表单：
// 1. 根据data渲染
// 2. 能够渲染action和插槽列（这里action教程中是固定到最后的）
// 3. 能够通过点击编辑行列元素
// 4. 支持加载动画
// 5. 支持分页
// 6. 支持行编辑

import { TableProp } from "./components/types";
import { reactive } from "vue";
import AdvanceTable from "./components/table.vue";
export default {
  components: {
    AdvanceTable,
  },
  setup() {
    const tableProp: TableProp = reactive<TableProp>({
      border: true,
      data: [
        {
          id: "12987122",
          name: "Tom",
          amount1: "234",
          amount2: "3.2",
          amount3: 10,
        },
        {
          id: "12987123",
          name: "Tom",
          amount1: "165",
          amount2: "4.43",
          amount3: 12,
        },
        {
          id: "12987124",
          name: "Tom",
          amount1: "324",
          amount2: "1.9",
          amount3: 9,
        },
        {
          id: "12987125",
          name: "Tom",
          amount1: "621",
          amount2: "2.2",
          amount3: 17,
        },
        {
          id: "12987126",
          name: "Tom",
          amount1: "539",
          amount2: "4.1",
          amount3: 15,
        },
      ],
      items: [
        {
          prop: "id",
          label: "ID",
        },
        {
          prop: "name",
          label: "姓名",
          editable: false,
        },
        {
          prop: "amount1",
          label: "销量1",
        },
        {
          prop: "amount2",
          label: "销量2",
        },
        {
          prop: "amount3",
          label: "销量3",
        },
        {
          label: "插槽",
          slot: "tag",
        },
      ],
      actions: [
        { type: ["edit", "delete"], slot: "preview", label: "操作" },
        // 自定义操作列，这里预想是用来打开对话框展示表单
        // 不好的地方是和预设操作列分开了（需求很类似，不过如果是增加字段
        // 什么的操作还是能够分开成多个列的），当然如果都加载一起也就没有
        // 单独将action写成数组的必要了...
        { type: ["add"], slot: "add", label: "增加字段" },
      ],
    });

    return {
      tableProp,
      log: console.log,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>