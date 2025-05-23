<template>
  <div class="bear-layout">
    <b-header />
    <div class="bear-content">
      <RouterView />
    </div>
    <div class="bear-footer flex justify-center items-center h-[100px] text-[14px]">
      <span class="mr-[10px]">bearx ©2023</span>
      <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2023117866号-2</a>
    </div>
  </div>
</template>
<script setup lang="ts">
import bHeader from "./header.vue";
</script>

<style lang="less" scoped>
.bear-layout {
  height: 100vh;
  overflow: auto;
  position: relative;
  .bear-content {
    background: #fff;
    min-height: calc(100vh - 100px);
  }
}
</style>
