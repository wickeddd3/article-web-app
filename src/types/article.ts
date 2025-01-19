import type { Company } from "@/types/company";
import type { User } from "@/types/user";

export type Article = {
  id: string;
  image: string;
  title: string;
  link: string;
  date: string;
  content: string;
  companyId: number;
  company: Company;
  writerId: number;
  writer: User;
  editorId?: number;
  editor?: User;
  createdAt: string;
  updatedAt: string;
};

export type ArticlesState = {
  articles: {
    data: Article[];
    loading: boolean;
  };
  addArticleForm: { loading: boolean };
};
