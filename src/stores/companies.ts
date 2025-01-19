import { defineStore } from "pinia";
import type { CompaniesState } from "@/types/company";
import type { CompanySchemaType } from "@/schema/company";
import { create, find, list, update } from "@/services/companies";
import { fileToDataURL } from "@/utils/file";

export const useCompaniesStore = defineStore("companies", {
  state: (): CompaniesState => ({
    companies: {
      data: [],
      loading: false,
    },
    addCompanyForm: {
      loading: false,
    },
  }),
  getters: {
    companiesData: (state) => state.companies.data,
  },
  actions: {
    async fetchCompanies() {
      const { data, status } = await list();
      if (status === 200) {
        this.companies.data = data;
        return true;
      }
      return false;
    },
    async createCompany(formData: CompanySchemaType) {
      this.addCompanyForm.loading = true;
      const data = {
        ...formData,
        logo: formData.logo ? await fileToDataURL(formData.logo || "") : "",
      };
      const { data: newCompany, status } = await create(data);
      if (status === 201) {
        const companies = [...this.companies.data, newCompany];
        this.companies.data = companies;
        this.addCompanyForm.loading = false;
        return true;
      }
      this.addCompanyForm.loading = false;
      return false;
    },
    async fetchCompany(id: number) {
      const { data, status } = await find(id);
      if (status === 200) {
        return data;
      }
      return false;
    },
    async updateCompany(
      formData: { name: string; status: string; newLogo: File | undefined },
      id: number
    ) {
      this.addCompanyForm.loading = true;
      const data = {
        ...formData,
        newLogo: formData.newLogo
          ? await fileToDataURL(formData.newLogo || "")
          : "",
      };
      const { data: updatedCompany, status } = await update(data, id);
      if (status === 200) {
        const companies = [...this.companies.data];
        const updatedCompanyIndex = companies.findIndex(
          (company) => Number(company.id) === id
        );
        companies[updatedCompanyIndex] = updatedCompany;
        this.companies.data = companies;
        this.addCompanyForm.loading = false;
        return true;
      }
      this.addCompanyForm.loading = false;
      return false;
    },
  },
});
