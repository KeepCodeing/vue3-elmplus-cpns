import { defineComponent, useAttrs, ref, reactive } from "vue";
import { ElPagination } from "element-plus";

export default defineComponent({
  props: {},
  emits: ["size-change", "current-change"],
  setup(props, { emit }) {
    const attrs = useAttrs();

    const defaultCurrentPage = ref(attrs.currentPage || 5);
    const defaultPageSizes = reactive(attrs.pageSizes || [100, 200, 300, 400]);
    const defaultPageSize = ref(attrs.pageSize || 100);
    const defaultTotal = ref(attrs.total || 1000);
    const defaultLayout = ref(
      attrs.layout || "total, sizes, prev, pager, next, jumper"
    );

    const defaultSizeChange = (size) => {
      defaultPageSize.value = size;
      emit("size-change", size);
    };
    const defaultCurrentChange = (page) => {
      defaultCurrentPage.value = page;
      emit("current-change", page);
    };

    return () => (
      <>
        <ElPagination
          v-model={defaultCurrentPage}
          {...attrs}
          {...{
            "current-page": defaultCurrentPage.value,
            "page-sizes": defaultPageSizes,
            "page-size": defaultPageSize.value,
            "hide-on-single-page": true,
            layout: defaultLayout.value,
            total: defaultTotal.value,
            onCurrentChange: (page) => defaultCurrentChange(page),
            onSizeChange: (size) => defaultSizeChange(size),
          }}
        />
      </>
    );
  },
});
