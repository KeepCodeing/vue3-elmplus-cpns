import { FormRules, ButtonType } from "element-plus";

// form-item中的组件，例如input或者select等的属性
export interface FormItemCpn {
  // 暂时只写这么多可用组件
  // 另外加了个slot，用来提高扩展性
  type:
    | "input"
    | "select"
    | "option"
    | "checkbox-group"
    | "checkbox"
    | "switch"
    | "radio-group"
    | "radio"
    | "slot";
  // checkbox等组件还可以额外设置label和value
  label?: string;
  value?: any;
  // 额外参数
  attr?: object;
  placeholder?: string;

  // select之类的组件是需要嵌套的，所以这里还需要指定children
  children?: FormItemCpn[];
}

// form-item所使用的属性
export interface FormItem {
  prop?: string;
  label?: string;
  // labelWidth?: string | number;
  required?: boolean;

  // 虽然动态绑定用不了value，但option之类的子组件还是需要的
  value?: string;

  // error?: string;
  showMessage?: boolean;
  size?: "large" | "default" | "small";

  option: FormItemCpn;
}

export interface ActionButtonProp {
  type?: ButtonType;
  text?: string;

  // 这两个属性可以用来决定是否渲染重置和提交按钮
  // 如果不填则不渲染，如果填了，则判断是否有其它
  // 几个字段，如果没有，就渲染默认按钮，如果有，
  // 就渲染自定义的属性
  submit?: boolean;
  reset?: boolean;

  attr?: any;
}

export interface FormProp {
  // 数据源 form-item-cpn使用model[prop]来进行绑定
  model: any;
  // 全局label-width
  labelWidth?: string | number;
  attr?: object;
  // 这里给rule设置成any了，其实可以拷贝一份类型定义
  rules?: FormRules;

  item: FormItem[];

  actions?: ActionButtonProp[];
}
