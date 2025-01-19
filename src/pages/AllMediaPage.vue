<script setup lang="ts">
import { useArticlesStore } from "@/stores/articles";
import { useAuthStore } from "@/stores/auth";
import { onMounted, computed } from "vue";
import type { User } from "@/types/user";
import type { Article } from "@/types/article";

const articlesStore = useArticlesStore();
const authStore = useAuthStore();
const articles = computed(() => articlesStore.articlesData);
const authUserIsEditor = computed(() => authStore.authUserIsEditor);

const showArticleUser = (user?: User) => {
  if (!user) return "";
  return `${user?.firstname} ${user?.lastname}`;
};
const canEditArticle = (article: Article, isEditor: boolean) => {
  if (!article) return false;
  if (article.status === "ForEdit") return true;
  if (article.status === "Published" && isEditor) return true;
  return false;
};

onMounted(() => articlesStore.fetchArticles());
</script>

<template>
  <div>
    <h1>All media</h1>
    <RouterLink :to="`/articles/create`">Create new article</RouterLink>
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Link</th>
          <th>Writer</th>
          <th>Editor</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td>
            <img :src="article.image" width="120px" height="100px" />
          </td>
          <td>{{ article.title }}</td>
          <td>{{ article.link }}</td>
          <td>
            {{ showArticleUser(article?.writer) }}
          </td>
          <td>
            {{ showArticleUser(article?.editor) }}
          </td>
          <td>{{ article.status }}</td>
          <td>
            <RouterLink
              v-if="canEditArticle(article, authUserIsEditor)"
              :to="`/articles/${article.id}/edit`"
              >Edit</RouterLink
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
