<template>
  <div>
    <my-notice :badgeConfig="{ value: 99, max: 30 }">
      <template #default>I am content</template>
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

export default {
  components: {
    MyNotice,
  },

  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>