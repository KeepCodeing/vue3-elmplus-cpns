<template>
  <div>
    <el-table
      :data="tableProp.data"
      :border="tableProp.border"
      :height="tableProp.height"
    >
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        :fixed="item.fixed"
        :align="item.align"
        :width="item.width"
        v-for="item in tableProp.items"
        :key="item.prop"
      >
        <template v-if="item.slot != null" #default="{ $index, row, column }">
          <!-- 优先使用插槽，然后才是action -->
          <slot :name="item.slot" :scope="{ $index, row, column }"></slot>
        </template>
      </el-table-column>
      <el-table-column
        :label="item.label"
        v-for="item in tableProp.actions"
        :key="item.type"
      >
        <template #default="scope" v-if="item.slot === 'preview'">
          <slot
            name="preview"
            :scope="scope"
            v-for="act in item.type"
            :key="act"
          >
            <el-button
              v-if="act === 'edit' || act === 'delete'"
              :type="act === 'edit' ? 'primary' : 'danger'"
              @click="handleTableAction(act, scope)"
              >{{ act === "edit" ? "编辑" : "删除" }}</el-button
            >
          </slot>
        </template>
        <!-- 不知道为什么v-else配对不上，可能是因为preview内部也有v-if -->
        <template v-if="item.slot !== 'preview'">
          <slot :name="item.slot"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { TableProp } from "./types";
import { PropType } from "vue";
import { cloneDeep } from "lodash";
import { RowProps } from "element-plus";

export default {
  props: {
    tableProp: {
      type: Object as PropType<TableProp>,
      required: true,
    },
  },
  setup({ tableProp: tp }) {
    const tableProp = cloneDeep(tp);

    // action排在最后，只提供一个slot
    // 教程里是用分类，不过想了想并没必要
    // 发现排序做法不行w，这样做还会导致items被排序，渲染时就不是按声明
    // 的来了...
    // 那实际上action并没有多大用，因为slot一样可以做（当然是规定了action只能
    // 声明在最后的情况...
    // tableProp.items.sort((a: TableItemProp) => (a.action === true ? 1 : -1));

    const handleTableAction = (type: string, scope: RowProps) => {
      console.log(type, scope);
    };

    return {
      tableProp,
      handleTableAction,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>