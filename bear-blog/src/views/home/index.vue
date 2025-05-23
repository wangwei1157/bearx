<template>
  <div class="home">
    <img class="w-full h-[200px]" :src="bgImg" alt="" />
    <div class="home-content">
      <div class="home-left">
        <articleList />
      </div>
      <div class="home-right px-[5px]">
        <div
          class="user-card overflow-hidden mb-[10px] pb-[10px] rounded-[5px] shadow-md"
        >
          <div class="user-card-bg w-full h-[140px] bg-green-200"></div>
          <div class="user-card-info w-full relative px-[10px]">
            <div
              class="user-avatar bg-slate-700 w-[60px] h-[60px] absolute -top-[30px] left-[20px] rounded-[50%]"
            ></div>
            <div class="user-name text-[14px] text-gray-800 pl-[75px] pt-[10px]">
              小王的个人博客
            </div>
            <div class="h-[50px] text-[12px] p-[5px]">这个人很懒，什么也没有留下。</div>
            <div class="flex justify-between px-[50px] py-[10px]">
              <div
                class="flex flex-col items-center cursor-pointer"
                v-for="(item, index) in list"
                :key="index"
              >
                <div class="text-[14px]">{{ item.name }}</div>
                <div class="text-[18px]">{{ item.value }}</div>
              </div>
            </div>
            <div class="flex justify-center gap-[10px]">
              <i class="text-[28px] cursor-pointer iconfont icon-weibo"></i>
              <i class="text-[28px] cursor-pointer iconfont icon-weixin"></i>
              <i class="text-[28px] cursor-pointer iconfont icon-xiaohongshu"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import articleList from "@/views/article/index.vue";
import { ref } from "vue";
const bgImg = ref(new URL("../../assets/images/home/home-bg.jpg", import.meta.url).href);
const list = ref([
  {
    name: "文章",
    value: "0",
  },
  {
    name: "分类",
    value: "0",
  },
  {
    name: "标签",
    value: "0",
  },
]);
</script>

<style lang="less" scoped>
.home {
  .home-content {
    display: flex;
    max-width: 1080px;
    margin: 0 auto;
    .home-left {
      width: 810px;
    }
    .home-right {
      width: calc(100% - 810px);
    }
  }
}
</style>
