<script setup lang="ts">
import { useArticlesStore } from "@/stores/articles";
import { onMounted, computed } from "vue";

const articlesStore = useArticlesStore();
const articles = computed(() => articlesStore.articlesData);

onMounted(() => articlesStore.fetchArticles());
</script>

<template>
  <div>
    <RouterLink :to="`/articles/create`">Create new article</RouterLink>
    <ul>
      <li v-for="article in articles" :key="article.id">
        {{ article.title }}
        <RouterLink :to="`/articles/${article.id}/edit`">Edit</RouterLink>
      </li>
    </ul>
  </div>
</template>
