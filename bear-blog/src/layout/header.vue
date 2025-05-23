<template>
  <div
    class="bear-header flex items-center justify-between px-[20px]"
    :class="{
      'animate__animated animate__slideOutUp': isHeaderHidden && lastScrollTop > 0,
      'animate__animated animate__slideInDown bg-color': !isHeaderHidden && lastScrollTop > 0,
    }"
  >
    <div class="avatar"></div>
    <div class="bear-nav flex items-center">
      <div
        class="nav-item flex items-center mx-[10px] text-white cursor-pointer hover:text-blue-300 text-[14px]"
        v-for="(item, index) in navList"
        :key="index"
        @click="() => $router.push(item.path)"
      >
        <el-icon class="mr-[2px]">
          <component :is="item.icon"></component>
        </el-icon>
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from "vue";

const navList = ref([
  {
    name: "首页",
    path: "/",
    icon: "HomeFilled",
  },
  // {
  //   name: "文章",
  //   path: "/article",
  //   icon: "Document",
  // },
  // {
  //   name: "标签",
  //   path: "/tag",
  //   icon: "CollectionTag",
  // },
  // {
  //   name: "归档",
  //   path: "/archive",
  //   icon: "FolderOpened",
  // },
  // {
  //   name: "友链",
  //   path: "/link",
  //   icon: "Link",
  // },
  // {
  //   name: "留言",
  //   path: "/message",
  //   icon: "Message",
  // },
  // {
  //   name: "搜索",
  //   path: "/search",
  //   icon: "Search",
  // },
  // {
  //   name: "关于",
  //   path: "/about",
  //   icon: "InfoFilled",
  // },
]);
const isInit = ref(true);
const isHeaderHidden = ref(false);
const lastScrollTop = ref(0);

const handleScroll = (event: Event) => {
  const scrollTop = (event.target as HTMLElement).scrollTop;

  if (scrollTop > 50 && scrollTop > lastScrollTop.value) {
    isHeaderHidden.value = true;
  } else {
    isHeaderHidden.value = false;
  }

  lastScrollTop.value = scrollTop <= 0 ? 0 : scrollTop;
};
onMounted(() => {
  document.querySelector(".bear-layout")?.addEventListener("scroll", handleScroll);
  setTimeout(() => {
    isInit.value = false;
  }, 1000);
});

onUnmounted(() => {
  document.querySelector(".bear-layout")?.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="less" scoped>
.bear-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2001;
  width: 100%;
  height: 50px;
  overflow: hidden;
  box-sizing: border-box;
  background: transparent;
  .avatar {
    width: 40px;
    height: 40px;
  }
}
.bear-header.bg-color {
  background: rgba(29, 30, 31, 0.5);
}
</style>
