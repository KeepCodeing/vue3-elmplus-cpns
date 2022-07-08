<template>
  <div>
    <advance-form
      @valid-success="validSuccess"
      @valid-failed="validFailed"
      :formOption="formOption"
    />
  </div>
</template>

<script lang="ts">
// 高级表单
// 基本要求：
// 1. 能根据配置（JS或者JSON）渲染出对应字段的表单，例如
// input、select、checkbox等组件
// 2. 能提供表单重置和表单校验
// 3. 提供一个插槽用来存放表单操作按钮，例如提交和清空

// 核心思路：
// component动态组件
// 通过用户传递进来的配置使用component生成对应组件，要注意input和
// select等组件的区别，后者是可能包括子组件的

import AdvanceForm from "./components/form.vue";
import { reactive } from "vue";
import { FormProp } from "./components/types";

import { ElMessage } from "element-plus";

export default {
  components: {
    AdvanceForm,
  },
  setup() {
    const formData = reactive({
      name: "",
      age: 0,
      gender: "",
    });

    const formOption: FormProp = reactive<FormProp>({
      model: formData,
      labelWidth: "120px",
      rules: {
        name: [{ max: 3, min: 2, message: "姓名不合法", trigger: ["blur"] }],
      },
      item: [
        {
          label: "姓名",
          prop: "name",
          required: true,

          option: { type: "input", placeholder: "请输入姓名" },
        },
        {
          label: "年龄",
          prop: "age",
          required: true,
          option: { type: "input", placeholder: "请输入年龄" },
        },
        {
          label: "性别",
          prop: "gender",
          required: true,
          option: { type: "input", placeholder: "请输入性别" },
        },
        {
          label: "爱好",
          prop: "habit",
          required: true,
          option: {
            type: "select",
            children: [
              { type: "option", label: "听歌", value: "1" },
              { type: "option", label: "自闭", value: "2" },
              { type: "option", label: "写代码", value: "3" },
            ],
          },
        },
      ],
      actions: [{ reset: true, text: "清空" }, { submit: true }],
    });

    // 这里validate的作用是用来判断表单是否通过验证的
    // 而通过验证后一般的操作就是发请求，没通过就是提示（rules就算了，
    // 但可能有什么特殊需求需要弹出message之类的）
    // 那么实际上可以发现拿到form之后调用和直接传个回调
    // 的作用是一样的，而且可以省去一些重复操作，例如获取
    // 表单实例

    // 这里再想下所谓回调，其实Vue应该是没法实现回调的，毕竟
    // 只能用emit的形式去调用父组件方法；也就是所谓回调其实
    // 是emit事件。接着考虑写不写成$attr形式，实际上都一样
    // 不过后者会在子表单里多个调用
    // const form = ref<any>();

    // const validateForm = () => form.value.validateForm();

    const validSuccess = (model: any) => {
      ElMessage({
        type: "success",
        message: "提交成功！",
      });

      console.log(model);
    };

    const validFailed = () => {
      ElMessage({
        type: "warning",
        message: "提交失败！",
      });
    };

    return { formOption, validSuccess, validFailed };
  },
};
</script>

<style lang="scss" scoped>
</style>