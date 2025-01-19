<script setup lang="ts">
import { useUsersStore } from "@/stores/users";
import { onMounted, computed } from "vue";

const usersStore = useUsersStore();
const users = computed(() => usersStore.usersData);

onMounted(() => usersStore.fetchUsers());
</script>

<template>
  <div>
    <h1>Users</h1>
    <RouterLink :to="`/users/create`">Create new user</RouterLink>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Type</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ `${user.firstname} ${user.lastname}` }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.type }}</td>
          <td>{{ user.status }}</td>
          <td>
            <RouterLink :to="`/users/${user.id}/edit`">Edit</RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
