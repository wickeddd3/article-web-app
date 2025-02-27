import { apiRequest } from "@/lib/axios";
import { type UserSchemaType } from "@/schema/user";
import { AxiosError } from "axios";

const baseUrl = "/api/users";
const usersResource = apiRequest({ url: baseUrl });

export const list = async () => {
  try {
    return await usersResource.get();
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response;
    }
    throw new Error("An unexpected error occurred");
  }
};

export const create = async (data: UserSchemaType) => {
  try {
    return await usersResource.post(data);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response;
    }
    throw new Error("An unexpected error occurred");
  }
};

export const find = async (id: number) => {
  try {
    return await usersResource.get({ url: `${baseUrl}/${id}` });
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response;
    }
    throw new Error("An unexpected error occurred");
  }
};

export const update = async (
  data: {
    firstname: string;
    lastname: string;
    type: string;
    status: string;
    email: string;
    password: string;
  },
  id: number
) => {
  try {
    return await usersResource.put(data, { url: `${baseUrl}/${id}` });
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response;
    }
    throw new Error("An unexpected error occurred");
  }
};

export const remove = async (id: number) => {
  try {
    return await usersResource.delete({ url: `${baseUrl}/${id}` });
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response;
    }
    throw new Error("An unexpected error occurred");
  }
};
