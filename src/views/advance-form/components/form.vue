<template>
  <div>
    <el-form
      v-if="model"
      :rules="formOption.rules"
      :model="model"
      :label-width="formOption.labelWidth"
      :validate-on-rule-change="true"
      ref="formEl"
    >
      <el-form-item
        v-for="item in formOption.item"
        :key="item.prop"
        :prop="item.prop"
        :required="item.required"
        :show-message="item.showMessage"
        :size="item.size"
        :label="item.label"
      >
        <!-- :value="item.option.value"，这里不能加value，否则动态绑定无效
             一个坑点：这里的component似乎不会自动导入，得下面手动导入
             也可能需要全局注册？
        -->
        <component
          :is="'el-' + item.option.type"
          :label="item.option.label"
          :placeholder="item.option.placeholder"
          v-bind="item.option.attr"
          v-model="model[item.prop]"
        >
          <template v-if="item.option.children?.length">
            <component
              v-for="child in item.option.children"
              :key="child.label"
              :is="'el-' + child.type"
              :label="child.label"
              :value="child.value"
              :placeholder="child.placeholder"
              v-bind="child.attr"
            ></component>
          </template>
        </component>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { PropType } from "vue-demi";
// 可以只导入其中一个模块，这样能够避免导入整个lodash
import cloneDeep from "lodash/fp/cloneDeep";
// 项目里没加TS，所以没有类型定义...
// 不过可以从用例中发现有一些属性是非常常用的
import { FormProp } from "./types";

import {
  ElInput,
  ElSelect,
  ElOption,
  ElCheckboxGroup,
  ElCheckbox,
  ElSwitch,
  ElRadioGroup,
  ElRadio,
  FormInstance,
} from "element-plus";

export default {
  components: {
    "el-input": ElInput,
    "el-select": ElSelect,
    "el-option": ElOption,
    "el-checkbox-group": ElCheckboxGroup,
    "el-checkbox": ElCheckbox,
    "el-switch": ElSwitch,
    "el-radio-group": ElRadioGroup,
    "el-radio": ElRadio,
  },
  props: {
    formOption: {
      type: Object as PropType<FormProp>,
      required: true,
    },
  },
  setup({ formOption }) {
    // 这里要对model进行深拷贝，不然双向绑定会变成操作props
    const model = ref<any>(null);
    // const tempModel: any = {};
    // for (const item of formOption.item) {
    //   tempModel[item.prop!] = formOption.model[item.prop!];
    // }
    const formEl = ref<FormInstance>();

    const validateForm = () => {
      formEl.value!.validate((valid) => {
        console.log(valid);
      });
    };

    model.value = cloneDeep(formOption.model);

    return {
      model,
      formOption,
      // 当前没有使用setup语法糖，所以可以不用expose导出
      // 父组件可以直接使用ref获取子组件然后调用，使用的
      // 作用是限制可访问属性
      formEl,
      validateForm,
    };
  },
  // 限制下父组件可以访问到的属性
  expose: ["validateForm"],
};
</script>

<style lang="scss" scoped>
</style>