export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  status: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};

export type UsersState = {
  users: {
    data: User[];
    loading: boolean;
  };
  addUserForm: { loading: boolean };
};
