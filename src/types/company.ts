export type Company = {
  id: string;
  logo: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type CompaniesState = {
  companies: {
    data: Company[];
    loading: boolean;
  };
  addCompanyForm: { loading: boolean };
};
