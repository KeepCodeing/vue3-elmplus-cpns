<template>
  <div>
    <my-notice :badgeConfig="{ value: 99, max: 30 }">
      <template #content>
        <tabs :tab-list="tabList"></tabs>
      </template>
      <template #reference>
        <el-icon>
          <component :is="'i-bell'" />
        </el-icon>
      </template>
    </my-notice>
  </div>
</template>

<script>
import MyNotice from "./components/notice.vue";
import Tabs from './components/tabs.vue'

export default {
  components: {
    MyNotice,
    Tabs
  },

  setup() {
    const tabList = [{
      label: '通知',
      name: 'first',
      listConfig: {
        avatar: true,
        title: true,
        time: true
      },
      listData: [{
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        title: "deafult title",
        time: "2022年4月5日17:26:45"
      }, {
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        title: "deafult title",
        time: "2022年4月5日17:26:45"
      },
      {
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        title: "deafult title",
        time: "2022年4月5日17:26:45"
      }]
    }, {
      label: '关注',
      name: 'second',
      istConfig: {
        avatar: true,
        title: true,
        time: true,
        desc: true
      },
      listData: []
    }, {
      label: '待办',
      name: 'third',
      listConfig: {
        tag: true,
        title: true,
        desc: true
      },
      listData: []
    }];

    return {
      tabList
    };
  },
};
</script>

<style lang="scss" scoped>
</style>