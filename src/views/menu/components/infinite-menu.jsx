// 使用JSX递归生成无限层级的菜单栏
// 偷懒去掉了slot部分的功能...
// 写完发现所谓slot其实是sub-menu的标题....

import { defineComponent } from "vue";
import { ElMenu, ElMenuItem, ElSubMenu, ElIcon } from "element-plus";

export default defineComponent({
  props: {
    menuList: {
      type: Array,
      default: () => [
        {
          title: "menu-1",
          icon: "i-setting",
          index: "1",
          children: [
            {
              title: "menu-1-1",
              icon: "i-setting",
              index: "1-1",
            },
            {
              title: "menu-1-2",
              icon: "i-setting",
              index: "1-2",
              children: [
                {
                  title: "menu-1-2-1",
                  icon: "i-setting",
                  index: "1-2-1",
                  children: [
                    {
                      title: "menu-1-2-1-1",
                      icon: "i-setting",
                      index: "1-2-1-1",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "menu-2",
          icon: "i-setting",
          index: "2",
        },
        {
          title: "menu-3",
          icon: "i-setting",
          index: "3",
        },
      ],
    },
  },
  components: {
    ElMenu,
    ElMenuItem,
    ElSubMenu,
    ElIcon,
  },
  setup(props) {
    const renderMenu = (item) => {
      const slots = {
        title: () => (
          <>
            <el-icon>
              <item.icon></item.icon>
            </el-icon>
            <span>{item.title}</span>
          </>
        ),
      };
      if (item.children && item.children.length) {
        return (
          <el-sub-menu index={item.index} v-slots={slots}>
            {item.children.map((ch) => renderMenu(ch))}
          </el-sub-menu>
        );
      }
      if (!item.children || !item.children.length) {
        return (
          <el-menu-item index={item.index}>
            <el-icon>
              <item.icon />
            </el-icon>
            <span>{item.title}</span>
          </el-menu-item>
        );
      }
    };
    return () => {
      return (
        <el-menu>{props.menuList.map((item) => renderMenu(item))}</el-menu>
      );
    };
  },
});
