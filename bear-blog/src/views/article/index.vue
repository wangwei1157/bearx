<template>
  <div class="article-list px-[5px] flex flex-col items-center">
    <div
      class="article-card bg-white flex mb-[10px] shadow-md even:flex-row-reverse cursor-pointer hover:translate-y-[-3px] hover:shadow-xl transition-all duration-[300ms]"
      v-for="(item, index) in articleList"
      :key="index"
      @click="handleArticleClick(item)"
    >
      <div class="card-left"></div>
      <div class="card-right flex flex-col px-[10px] py-[20px]">
        <div
          class="card-title mb-[10px] text-[22px] font-semibold text-ellipsis overflow-hidden whitespace-nowrap hover:text-blue-500"
        >
          {{ item.title }}
        </div>
        <div
          class="card-content flex-1 text-ellipsis line-clamp-5 text-[16px] text-zinc-600"
        >
          {{ item.content }}
        </div>
        <div class="card-footer flex text-[14px] text-zinc-400">
          <span>发布时间：{{ item.createTime }}</span>
          <span>更新时间：{{ item.updateTime }}</span>
          <span class="ml-[5px] cursor-pointer hover:text-blue-500">
            {{ item.category }}
          </span>
        </div>
      </div>
    </div>
    <el-pagination
      class="mt-[20px]"
      background
      layout="prev, pager, next"
      :total="1000"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const articleList = ref([
  {
    title: "文章标题",
    content: "文章内容",
    createTime: "2024-01-01",
    updateTime: "2024-01-01",
    category: "所属分类",
  },
]);

function handleArticleClick(item: any) {
  console.log(item);
  router.push({
    path: "/article",
    query: {
      title: item.title,
      content: item.content,
      createTime: item.createTime,
      updateTime: item.updateTime,
      category: item.category,
    },
  });
}
</script>

<style lang="less" scoped>
.article-list {
  width: 100%;
  .article-card {
    width: 795px;
    height: 224px;
    overflow: hidden;
    border-radius: 5px 5px 8px 8px;
    // box-shadow: 0 3px 6px 3px rgba(7, 17, 27, 0.06);
    .card-left {
      width: 40%;
      height: 100%;
      background: wheat;
    }
    .card-right {
      width: 60%;
      height: 100%;
    }
  }
}
</style>
