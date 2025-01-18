import { defineStore } from "pinia";
import type { UsersState } from "@/types/user";
import type { UserSchemaType } from "@/schema/user";
import { create, find, list, update } from "@/services/users";

export const useUsersStore = defineStore("users", {
  state: (): UsersState => ({
    users: {
      data: [],
      loading: false,
    },
    addUserForm: {
      loading: false,
    },
  }),
  getters: {
    usersData: (state) => state.users.data,
  },
  actions: {
    async fetchUsers() {
      const { data, status } = await list();
      if (status === 200) {
        this.users.data = data;
        return true;
      }
      return false;
    },
    async createUser(formData: UserSchemaType) {
      this.addUserForm.loading = true;
      const { data: newUser, status } = await create(formData);
      if (status === 201) {
        const users = [...this.users.data, newUser];
        this.users.data = users;
        this.addUserForm.loading = false;
        return true;
      }
      this.addUserForm.loading = false;
      return false;
    },
    async fetchUser(id: number) {
      const { data, status } = await find(id);
      if (status === 200) {
        return data;
      }
      return false;
    },
    async updateUser(formData: UserSchemaType, id: number) {
      this.addUserForm.loading = true;
      const { data: updatedUser, status } = await update(formData, id);
      if (status === 200) {
        const users = [...this.users.data];
        const updatedUserIndex = users.findIndex(
          (user) => Number(user.id) === id
        );
        users[updatedUserIndex] = updatedUser;
        this.users.data = users;
        this.addUserForm.loading = false;
        return true;
      }
      this.addUserForm.loading = false;
      return false;
    },
  },
});
