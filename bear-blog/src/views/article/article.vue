<template>
  <div class="bear-article flex mt-[100px]">
    <div class="article-content">
      <MdPreview :editorId="id" :modelValue="text" />
    </div>
    <div class="article-directory">
      <div class="fixed top-[100px] rounded-[5px] overflow-hidden p-[10px]">
        <div class="text-[22px] font-semibold">目录</div>
        <MdCatalog :editorId="id" :scrollElement="scrollElement" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { MdPreview, MdCatalog } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
import articleJson from "@/api/mock.json";
const id = "preview-only";
const text = ref(articleJson.article_content);
const scrollElement = document.documentElement || document.querySelector(".bear-layout");
</script>

<style lang="less" scoped>
.bear-article {
  max-width: 1080px;
  margin: 0 auto;
  .article-content {
    width: calc(100% - 310px);
    box-shadow: 0 3px 6px 3px rgba(7, 17, 27, 0.06);
  }
  .article-directory {
    width: 300px;
    flex-shrink: 0;
    margin-left: 10px;
    & > div {
      box-shadow: 0 3px 6px 3px rgba(7, 17, 27, 0.06);
      & > div {
        position: relative;
        padding-bottom: 5px;
        &::after {
          position: absolute;
          content: "";
          width: 100%;
          height: 1px;
          background: #ccc;
          transform: scaleY(0.5);
          bottom: 0;
          left: 0;
        }
      }
    }
    :deep(.md-editor-catalog) {
      span {
        font-size: 14px;
      }
    }
  }
}
</style>
