import { apiRequest } from "@/lib/axios";
import { type CompanySchemaType } from "@/schema/company";
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

export const create = async (data: CompanySchemaType) => {
  try {
    return await companiesResource.post(data);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response;
    }
    throw new Error("An unexpected error occurred");
  }
};

export const update = async (data: CompanySchemaType, id: number) => {
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
