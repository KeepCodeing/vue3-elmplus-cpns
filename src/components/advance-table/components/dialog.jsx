import { defineComponent, useAttrs, inject, ref } from "vue";
import { ElDialog, ElForm, ElFormItem, ElInput } from "element-plus";

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
