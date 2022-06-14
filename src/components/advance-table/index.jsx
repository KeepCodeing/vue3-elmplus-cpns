import { defineComponent, reactive } from "vue";
import AdvanceTable from "./components/table.jsx";

export default defineComponent({
  setup() {
    const tableData = reactive([
      {
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄",
      },
      {
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1517 弄",
      },
      {
        date: "2016-05-01",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1519 弄",
      },
      {
        date: "2016-05-03",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1516 弄",
      },
    ]);

    const columnConfig = [
      { prop: "date", label: "日期" },
      { prop: "name", label: "姓名" },
      {
        prop: "address",
        label: "地址",
        slot: ({ row, column, $index }) => {
          return (
            <span>
              {row.address}
              {$index}
            </span>
          );
        },
      },
    ];

    // const slots = {
    //   editRow: (row, index) => {},
    // };
    // v-slots={slots}

    return () => (
      <>
        <AdvanceTable
          column-config={columnConfig}
          data={tableData}
          background
          edit-row-config={{ useDefault: true }}
        ></AdvanceTable>
      </>
    );
  },
});
