import { apiRequest } from "@/lib/axios";
import { AxiosError } from "axios";

const baseUrl = "/api/companies";
const companiesResource = apiRequest({ url: baseUrl });

export const list = async () => {
  try {
    return await companiesResource.get();
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response;
    }
    throw new Error("An unexpected error occurred");
  }
};

export const create = async (data: {
  name: string;
  status: string;
  logo: string;
}) => {
  try {
    return await companiesResource.post(data);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response;
    }
    throw new Error("An unexpected error occurred");
  }
};

export const find = async (id: number) => {
  try {
    return await companiesResource.get({ url: `${baseUrl}/${id}` });
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response;
    }
    throw new Error("An unexpected error occurred");
  }
};

export const update = async (
  data: {
    name: string;
    status: string;
    newLogo: string;
  },
  id: number
) => {
  try {
    return await companiesResource.put(data, { url: `${baseUrl}/${id}` });
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response;
    }
    throw new Error("An unexpected error occurred");
  }
};

export const remove = async (id: number) => {
  try {
    return await companiesResource.delete({ url: `${baseUrl}/${id}` });
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response;
    }
    throw new Error("An unexpected error occurred");
  }
};
