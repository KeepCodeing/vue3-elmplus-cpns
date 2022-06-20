import { defineComponent, useAttrs, inject, ref } from "vue";
import { ElDialog, ElForm, ElFormItem, ElInput } from "element-plus";

/**
 * dialog组件：实际上只负责展示和隐藏，里面的内容可以是form/table
 * 不应该将其与table或者form组件强制关联，而是提供插槽，也就是
 * 参数什么的不能写死成table里的数据形式
 *
 */

export default defineComponent({
  props: {
    rowData: {
      type: Object,
      default() {
        return {};
      },
    },
    rowConfig: {
      type: Object,
      default() {
        return {};
      },
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const attrs = useAttrs();
    const eventBus = inject("eventBus");

    const visible = ref(false);

    eventBus.on("show-dialog", (data) => {
      visible.value = true;
      console.log(data);
    });

    return () => (
      <>
        <ElDialog v-model={visible.value}>
          <h2>hello world</h2>
        </ElDialog>
      </>
    );
  },
});
