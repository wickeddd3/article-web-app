<script setup lang="ts">
import type { Article } from "@/types/article";
import ArticleListItem from "@/components/articles/ArticleListItem.vue";

export type ArticleListProps = {
  title?: string;
  articles: Article[];
};

const props = withDefaults(defineProps<ArticleListProps>(), {
  title: "",
  articles: () => [],
});

if (!props.articles) {
  throw new Error("The `articles` prop is required for ArticleList.");
}
</script>

<template>
  <div>
    <h1 v-if="title">{{ title }}</h1>
    <ul>
      <ArticleListItem
        v-for="article in articles"
        :key="article.id"
        :article="article"
      />
    </ul>
  </div>
</template>
