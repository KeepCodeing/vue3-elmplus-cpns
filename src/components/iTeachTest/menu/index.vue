<template>
  <div>
    <el-row :gutter="20" style="height: 80vh">
      <el-col :lg="6" :md="10" :sm="24" :xl="6" :xs="24">
        <!-- 预览框整体 -->
        <div class="phone-preview">
          <!-- 底部预览菜单 -->
          <div class="phone-menu">
            <!-- 预览菜单的列容器 -->
            <template v-if="menuList.length">
              <div
                v-for="(item, idx) in menuList"
                :key="item.name"
                class="menu-item edit-able-menu nomoral-pointer"
              >
                <!-- 若干个子菜单 -->
                <template v-if="curMenuItem.idx === idx">
                  <div class="menu-child-container">
                    <div
                      class="edit-able-menu-item menu-child-item"
                      :class="{ active: curMenuItem.cidx === cidx }"
                      v-for="(child, cidx) in item.sub_button"
                      :key="child.name"
                      @click="editChildMenu(cidx)"
                    >
                      {{ child.name }}
                    </div>
                    <template v-if="item.sub_button?.length < 5">
                      <div
                        class="menu-item add-item"
                        style="font-size: 30px"
                        @click="addMenuChildItem(idx)"
                      >
                        +
                      </div>
                    </template>
                  </div>
                </template>
                <!-- 底部父菜单 -->
                <div
                  :class="{
                    active: curMenuItem.idx === idx,
                    'edit-able-menu-item': true,
                  }"
                  @click="editMenuItem(item, idx)"
                >
                  {{ item.name }}
                </div>
              </div>
            </template>
            <!-- 编辑菜单 -->
            <template v-if="menuList.length < 3">
              <div
                class="menu-item add-item"
                style="font-size: 30px"
                @click="addMenuItem"
              >
                +
              </div>
            </template>
          </div>
        </div>
      </el-col>
      <el-col :lg="18" :md="14" :sm="24" :xl="18" :xs="24">
        <el-card shadow="never">
          <template #header>
            <div>
              <span>{{
                contentMenu.name ? contentMenu.name : "菜单管理"
              }}</span>
            </div>
          </template>
          <div>
            <el-form>
              <el-form-item
                label="提示"
                v-if="!contentMenu.name"
                label-width="120px"
              >
                <span>请选择菜单</span>
              </el-form-item>
              <el-form-item label="菜单ID" label-width="120px"
                ><el-select
                  v-model="curMenuItem.menuid"
                  placeholder="请选择菜单预设"
                  @change="changeMenu"
                >
                  <el-option
                    v-for="item in menuidList"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div v-show="contentMenu.name">
            <el-form :model="curMenuItem.item">
              <el-form-item
                v-for="mkey in menuKeys"
                :key="mkey"
                :prop="contentMenu[mkey]"
                :label="mkey"
                label-width="120px"
              >
                <template v-if="mkey === 'name'">
                  <el-input v-model="contentMenu['tname']"></el-input>
                </template>
                <template v-else>
                  <el-input v-model="contentMenu[mkey]"></el-input>
                </template>
              </el-form-item>
              <el-form-item label-width="120px">
                <el-button type="primary" @click="saveMenu">保存</el-button>
                <el-button type="danger" @click="deleteMenu">删除</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 菜单编辑组件：仿照微信
//

import { computed, reactive } from "vue";
export default {
  setup() {
    let { data } = {
      msg: "success",
      code: 0,
      data: [
        {
          appid: "wx20d54e135a79baf4",
          createTime: 1579417832000,
          menu: '[{"url": "http://wx.icute.ltd/weixin/robot/manager/index.html?appid=wx20d54e135a79baf4", "name": "注册中心", "type": "view", "sub_button": []}]',
          menuid: "439634890",
        },
        {
          appid: "wx20d54e135a79baf4",
          createTime: 1579417832000,
          matchrule: '{"group_id": "100"}',
          menu: '[{"url": "http://wx.icute.ltd/weixin/robot/teacher/index.html?appid=wx565b5d2d5cb5ce1f", "name": "老师主页", "type": "view", "sub_button": []}, {"url": "http://wx.icute.ltd/weixin/robot/manager/coursewares.html?appid=wx20d54e135a79baf4", "name": "课件管理", "type": "view", "sub_button": []}, {"url": "http://wx.icute.ltd/weixin/robot/manager/index.html?appid=wx20d54e135a79baf4", "name": "注册中心", "type": "view", "sub_button": []}]',
          menuid: "439634892",
        },
        {
          appid: "wx20d54e135a79baf4",
          createTime: 1579417832000,
          matchrule: '{"group_id": "101"}',
          menu: '[{"name": "平台简介", "type": "media_id", "media_id": "wA8RRth68cn51H3ranbJRMMCWuYBgpQz3Us-C000rTk", "sub_button": []}, {"name": "老师中心", "sub_button": [{"url": "http://wx.icute.ltd/weixin/robot/teacher/search.html?appid=wx20d54e135a79baf4", "name": "查询", "type": "view", "sub_button": []}, {"url": "http://wx.icute.ltd/weixin/robot/finance/index.html?appid=wx20d54e135a79baf4", "name": "费用管理", "type": "view", "sub_button": []}, {"url": "http://wx.icute.ltd/weixin/robot/timetable/index.html?appid=wx20d54e135a79baf4", "name": "课表管理", "type": "view", "sub_button": []}, {"url": "http://wx.icute.ltd/weixin/robot/timetable/coursewares.html?appid=wx20d54e135a79baf4", "name": "课件系统", "type": "view", "sub_button": []}, {"url": "http://wx.icute.ltd/weixin/robot/teacher/index.html?appid=wx20d54e135a79baf4", "name": "老师主页", "type": "view", "sub_button": []}]}, {"url": "http://wx.icute.ltd/weixin/robot/manager/index.html?appid=wx20d54e135a79baf4", "name": "注册中心", "type": "view", "sub_button": []}]',
          menuid: "439634894",
        },
      ],
    };

    const menuidList = data.map((item) => item.menuid);

    const menuData = [];

    const menuList = reactive(menuData);
    // tname是用来暂存name值的，因为响应式的原因页面上使用了name的地方都会
    // 跟着更改，所以需要使用tname；computed的set不知道为什么没有生效...
    // 假设tname在请求完成后就会自动被添加
    const curMenuItem = reactive({
      item: { name: "", url: "", type: "", sub_button: [], tname: "" },
      idx: -1,
      cidx: -1,
      menuid: "",
    });

    const contentMenu = computed({
      get() {
        curMenuItem.item.tname = curMenuItem.item.name;
        if (curMenuItem.idx === -1) return curMenuItem.item;
        if (curMenuItem.cidx !== -1)
          return curMenuItem.item.sub_button[curMenuItem.cidx];

        return curMenuItem.item;
        // computed并不会包装返回值为reactive等响应式对象，所以这里得手动包装
        // return reactive({ url: curMenuItem.item.url, name: curMenuItem.item.name, type: curMenuItem.item.type });
      },
    });

    const addMenuItem = () => {
      menuList.unshift({
        name: "菜单名称",
        url: "",
        type: "view",
        sub_button: [],
      });
    };

    const addMenuChildItem = (idx) => {
      if (!menuList[idx].sub_button) menuList[idx].sub_button = [];
      menuList[idx].sub_button.push({
        name: "菜单名称",
        url: "",
        type: "view",
        sub_button: [],
        tname: "",
      });
    };

    const editChildMenu = (cidx) => {
      curMenuItem.cidx = cidx;
    };

    const editMenuItem = (item, idx) => {
      curMenuItem.item = item;
      curMenuItem.idx = idx;
      curMenuItem.cidx = -1;
    };

    const setMenuDefault = (isChild = false) => {
      curMenuItem.cidx = -1;
      if (!isChild) {
        curMenuItem.idx = -1;
        curMenuItem.item = {
          name: "",
          url: "",
          type: "",
          sub_button: [],
          tname: "",
        };
        curMenuItem.menuid = "";
      } else curMenuItem.item = menuList[curMenuItem.idx];
    };

    const saveMenu = () => {
      console.log(menuList);
    };

    const deleteMenu = () => {
      // 两种情况：删除子菜单和删除整个父菜单
      if (curMenuItem.cidx === -1) {
        menuList.splice(curMenuItem.idx, 1);
        setMenuDefault();
      } else {
        menuList[curMenuItem.idx]["sub_button"].splice(curMenuItem.cidx, 1);
        setMenuDefault(true);
      }
    };

    const changeMenu = (val) => {
      menuList.length = 0;
      JSON.parse(data.filter((item) => item.menuid === val)[0].menu).forEach(
        (item) => menuList.push(item)
      );
      curMenuItem.cidx = -1;
      curMenuItem.idx = 0;
      curMenuItem.menuid = val;
      curMenuItem.item = menuList[0];
    };

    const hiddenKeys = ["sub_button", "tname"];
    const menuKeys = computed(() =>
      Object.keys(contentMenu.value).filter((key) => !hiddenKeys.includes(key))
    );

    return {
      menuList,
      curMenuItem,
      contentMenu,
      menuKeys,
      hiddenKeys,
      menuidList,
      addMenuItem,
      editMenuItem,
      addMenuChildItem,
      editChildMenu,
      saveMenu,
      deleteMenu,
      changeMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
.phone-preview {
  min-height: 60vh;
  position: relative;
  overflow: hidden;
  border: 1px solid #e7e7eb;
}
.phone-menu {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  .div {
    width: 100%;
  }
}

.nomoral-pointer {
  cursor: default !important;
}

.phone-menu {
  .menu-item {
    height: 60px;
    line-height: 60px;
    flex: 1;
    justify-content: center;
    color: black;
    font-size: 20px;
    text-align: center;
    cursor: pointer;
    background: white;
  }

  .add-item {
    background: rgb(250, 250, 250);
    color: rgb(193, 193, 193);
    border: 1px solid rgb(193, 193, 193);
    :hover {
      background: rgb(238, 238, 238);
    }
  }

  .edit-able-menu {
    height: 100%;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    cursor: pointer;
  }

  .edit-able-menu-item {
    /* border-right: white solid 1px;
    border-top: white solid 1px; */
    border: 1px solid rgb(193, 193, 193);
    cursor: pointer;
  }

  .menu-child-item {
    border-top: none;
  }

  .menu-child-container {
    margin-bottom: 20px;
    .menu-child-item:first-child {
      border-top: 1px solid rgb(193, 193, 193) !important;
    }
  }
}

.phone-menu {
  &.div:last-child {
    border-right: none;
  }
}

.active {
  border: 1px solid #07c160 !important;
  color: #07c160;
}
</style>
