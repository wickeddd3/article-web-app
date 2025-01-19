<script setup lang="ts">
import type { Article } from "@/types/article";
import type { User } from "@/types/user";
import { isoStringToDate } from "@/utils/date";

export type ArticleListItemProps = {
  article: Article;
};

const props = defineProps<ArticleListItemProps>();

if (!props.article) {
  throw new Error("The `article` prop is required for ArticleListItem.");
}

const showArticleUserName = (user?: User) => {
  if (!user) return "";
  return `${user?.firstname} ${user?.lastname}`;
};
</script>

<template>
  <li class="article-list-item">
    <div>
      <img :src="article.image" width="120px" height="100px" />
      <div>
        <h3>{{ article.title }}</h3>
        <a :href="article.link" target="_blank">{{ article.link }}</a>
        <h5>{{ isoStringToDate(article.date) }}</h5>
        <h4>{{ showArticleUserName(article.writer) }}</h4>
        <h4>{{ showArticleUserName(article.editor) }}</h4>
      </div>
    </div>
  </li>
</template>
