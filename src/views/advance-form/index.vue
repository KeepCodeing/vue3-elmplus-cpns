<template>
  <div>
    <advance-form ref="form" :formOption="formOption" />
    <el-button type="primary" @click="validateForm">click me</el-button>
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
import { onMounted, reactive, ref } from "vue";
import { FormProp } from "./components/types";

import { FormInstance } from "element-plus";

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
          required: false,
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
      ],
    });

    const form = ref<any>();

    const validateForm = () => form.value.validateForm();

    return { formOption, form, validateForm };
  },
};
</script>

<style lang="scss" scoped>
</style>