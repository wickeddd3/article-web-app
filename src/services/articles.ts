import { apiRequest } from "@/lib/axios";
import { type ArticleSchemaType } from "@/schema/article";
import { AxiosError } from "axios";

const baseUrl = "/api/articles";
const articlesResource = apiRequest({ url: baseUrl });

export const list = async () => {
  try {
    return await articlesResource.get();
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response;
    }
    throw new Error("An unexpected error occurred");
  }
};

export const create = async (data: ArticleSchemaType) => {
  try {
    return await articlesResource.post(data);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response;
    }
    throw new Error("An unexpected error occurred");
  }
};

export const find = async (id: number) => {
  try {
    return await articlesResource.get({ url: `${baseUrl}/${id}` });
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response;
    }
    throw new Error("An unexpected error occurred");
  }
};

export const update = async (data: ArticleSchemaType, id: number) => {
  try {
    return await articlesResource.put(data, { url: `${baseUrl}/${id}` });
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response;
    }
    throw new Error("An unexpected error occurred");
  }
};

export const remove = async (id: number) => {
  try {
    return await articlesResource.delete({ url: `${baseUrl}/${id}` });
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response;
    }
    throw new Error("An unexpected error occurred");
  }
};
