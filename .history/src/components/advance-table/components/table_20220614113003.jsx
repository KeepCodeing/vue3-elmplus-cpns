import { defineComponent, useAttrs } from "vue";
import { ElTable, ElTableColumn, ElPagination, ElButton } from "element-plus";
import { camel2Kabake } from "../../../utils/formatCamel";

import Pagination from "./pagination";

export default defineComponent({
  props: {
    // [{ slot:  () => render(), prop, label }]
    columnConfig: {
      type: Array,
      default: () => [],
    },
    usePagination: {
      type: Boolean,
      default: true,
    },
    editRowConfig: {
      type: Object,
      // 这个地方的default不能用箭头函数，但数组似乎可以？
      // 如果用箭头函数不生效，会变成undefined
      default: function () {
        return {
          // fixed: "right",
          // title: "编辑",
          useDefault: false,
        };
      },
    },
    data: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  setup(props, { slots }) {
    // Table和TableColumn相同的两个属性：className和width
    // 显示通过props传递，通过table-和column-区分，其它常用
    // 属性也可以写在props中，但这里偷懒全用了attrs

    // 关于attrs的注意点：它会默认继承到子节点上，如果用fragment
    // 包裹，会报个警告，但是不影响使用；如果不包裹，子节点上都
    // 不需要展开attrs，当然这里需要进行处理
    const attrs = useAttrs();
    const tableAttrs = {};
    const columnAttrs = {};
    const pagAttrs = {};

    // vue-jsx里的插槽实际上就是外部传递过来的一个对象，包含
    // 若干个插槽内容渲染方法，不过得写成v-slots形式
    // console.log(slots);

    // 驼峰转kabake？风格
    // 这里table和下面的column都是通用配置，也就是最好不要写
    // label/prop之类的属性

    // TODO: 将参数改为tb-prop的形式，这样只用一次转换
    const trasformAttrs = (props, cmpAttrs) => {
      Object.keys(props).forEach((key) => {
        // console.log(key in props);
        if (key === "className" || key === "width" || key === "data") return;
        let tKey = camel2Kabake(key);
        if (attrs[tKey]) cmpAttrs[tKey] = attrs[tKey];
      });
    };

    trasformAttrs(ElTable.props, tableAttrs);
    trasformAttrs(ElTableColumn.props, columnAttrs);
    trasformAttrs(ElPagination.props, pagAttrs);

    const renderColumn = (column) =>
      props.columnConfig.map((config) => {
        const hasSlot = config.slot
          ? { __: (scope) => config.slot(scope) }
          : {};
        console.log(hasSlot);
        return (
          <ElTableColumn
            show-overflow-tooltip
            {...{ ...columnAttrs, ...config, ...hasSlot }}
            default={(scope) => console.log(scope)}
          >
            {/* 取出当前列，没有发现作用域插槽的用法，所以直接用data */}
            {/* {config.slot?.(props.data[idx][config.prop])} */}
          </ElTableColumn>
        );
      });

    const renderPagination = (column) =>
      props.usePagination && <Pagination {...pagAttrs} />;

    // console.log(props);

    // 渲染编辑列，提供默认编辑列，包含编辑/删除两个个选项
    // 同时提供插槽版，优先使用插槽版
    const renderEditRow = (column) => {
      if (slots.editRow) {
        return (
          <ElTableColumn
            label={props.editRowConfig.title || "编辑"}
            fixed={props.editRowConfig.fixed || "right"}
          >
            {slots.editRow()};
          </ElTableColumn>
        );
      }

      if (props.editRowConfig.useDefault) {
        return (
          <ElTableColumn label={"编辑"} fixed={"right"}>
            <ElButton type="text">编辑</ElButton>
            <ElButton type="text">删除</ElButton>
          </ElTableColumn>
        );
      }

      return null;
    };

    return () => (
      <>
        <ElTable {...tableAttrs} data={props.data}>
          {renderColumn()}
          {renderEditRow()}
        </ElTable>
        <div>{renderPagination()}</div>
      </>
    );
  },
});
