// 这里将action和slot分开写了，action专门用来指定
// 操作列，而slot用来渲染自定义的内容
// slot可以是任意一列，action则单独放在right渲染
export interface TableItemProp {
  prop?: string;
  label: string;

  slot?: string;

  // 这里和教程里的action就不是一个东西了，实际上是用来指定
  // action列的两个预设操作的
  // 从功能上来说它只能在slot为action型的列使用，所以更好的
  // 做法是教程里的抽离一个action出来？

  // 想了想虽然说是用slot，但实际上要实现的功能是开箱即用
  // 直接指明action的，所以这里搞成一个actionType数组，
  // 用户可以指定一个列为action，并且传入这个数组，程序
  // 根据actionType选择指定预设

  // 那么就最好单独指定action了，而且最好写在Table里，因为action
  // 在程序里的表现就是独立出来的若干个列，和插槽混着要多写点判断
  // 另外这里还有缺陷，就是只能使用预定的action
  // actionType: ("edit" | "delete")[];
  // 所以更好的做法是提供edit和delete预设，在提供一个any预设，当
  // 用户指定edit和delete时，直接使用预设，否则使用插槽

  // 是否可编辑
  editable?: boolean;

  fixed?: true | "left" | "right";
  align?: "left" | "center" | "right";
  width?: string | number;
}

interface ActionProp {
  // 把action搞成了一个数组，也就是一列可以渲染多个action
  type: ["edit"?, "delete"?] | string[];
  // 当type为any时，使用slot渲染列
  // 因为type变成了数组，所以没法直接根据type是edit还是delete判断是
  // 否是预设列了，这里只能用slot进行限制了，会根据slot渲染一个
  // preview列，这里面就放默认操作（写个v-if，判断是否是两种预设类型
  // 如果是，则渲染，否则不管）
  slot?: "preview" | string;
  label: string;
}

// 目前觉得table实际上最重要的属性只有个data，其他属性在简单渲染里是用不到的
// 所以这里暂且只写这么些属性了
// 数据绑定类似form组件，data[prop]
export interface TableProp {
  data: any[];

  height?: string | number;
  border?: boolean;

  items: TableItemProp[];

  pagination?: boolean;

  actions?: ActionProp[];
}
