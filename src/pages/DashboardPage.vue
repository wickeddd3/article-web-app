<script setup lang="ts">
import { useArticlesStore } from "@/stores/articles";
import { onMounted, computed } from "vue";
import type { Article } from "@/types/article";
import ArticleList from "@/components/articles/ArticleList.vue";

const articlesStore = useArticlesStore();
const publishedArticles = computed(() =>
  articlesStore.articlesData.filter(
    (article: Article) => article.status === "Published"
  )
);
const forEditArticles = computed(() =>
  articlesStore.articlesData.filter(
    (article: Article) => article.status === "ForEdit"
  )
);

onMounted(() => articlesStore.fetchArticles());
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <RouterLink :to="`/articles/create`">Create new article</RouterLink>
    <div>
      <ArticleList title="For Edit" :articles="forEditArticles" />
      <ArticleList title="Published" :articles="publishedArticles" />
    </div>
  </div>
</template>
