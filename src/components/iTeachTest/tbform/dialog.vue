<template>
  <div>
    <ElDialog v-model="visible"></ElDialog>
  </div>
</template>

<script setup>
import eventBus from '../../../utils/eventBus';
import { ElDialog } from 'element-plus'
import { onUnmounted } from 'vue-demi';

const visible = ref(false);

eventBus.on("dialog:open", () => {
  visible.value = true;
});

onUnmounted(() => {
  eventBus.off("dialog:open");
});
</script>

<style lang="scss" scoped>
</style>