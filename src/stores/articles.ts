import { defineStore } from "pinia";
import type { ArticlesState } from "@/types/article";
import type { ArticleSchemaType } from "@/schema/article";
import { create, find, list, update } from "@/services/articles";
import { fileToDataURL } from "@/utils/file";

export const useArticlesStore = defineStore("articles", {
  state: (): ArticlesState => ({
    articles: {
      data: [],
      loading: false,
    },
    addArticleForm: {
      loading: false,
    },
  }),
  getters: {
    articlesData: (state) => state.articles.data,
  },
  actions: {
    async fetchArticles() {
      const { data, status } = await list();
      if (status === 200) {
        this.articles.data = data;
        return true;
      }
      return false;
    },
    async createArticle(formData: ArticleSchemaType & { writerId: number }) {
      this.addArticleForm.loading = true;
      const data = {
        ...formData,
        date: new Date(formData.date),
        image: formData.image ? await fileToDataURL(formData.image || "") : "",
      };
      const { data: newCompany, status } = await create(data);
      if (status === 201) {
        const companies = [...this.articles.data, newCompany];
        this.articles.data = companies;
        this.addArticleForm.loading = false;
        return true;
      }
      this.addArticleForm.loading = false;
      return false;
    },
    async fetchArticle(id: number) {
      const { data, status } = await find(id);
      if (status === 200) {
        return data;
      }
      return false;
    },
    async updateArticle(
      formData: {
        companyId: number | string;
        editorId?: number | string;
        title: string;
        link: string;
        date: string;
        content: string;
        status: string;
        newImage?: File | undefined;
      },
      id: number
    ) {
      this.addArticleForm.loading = true;
      const data = {
        ...formData,
        date: new Date(formData.date),
        newImage: formData.newImage
          ? await fileToDataURL(formData.newImage || "")
          : "",
      };
      const { data: updatedArticle, status } = await update(data, id);
      if (status === 200) {
        const articles = [...this.articles.data];
        const updatedArticleIndex = articles.findIndex(
          (article) => Number(article.id) === id
        );
        articles[updatedArticleIndex] = updatedArticle;
        this.articles.data = articles;
        this.addArticleForm.loading = false;
        return true;
      }
      this.addArticleForm.loading = false;
      return false;
    },
  },
});
