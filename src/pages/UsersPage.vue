<script setup lang="ts">
import { useUsersStore } from "@/stores/users";
import { onMounted, computed } from "vue";

const usersStore = useUsersStore();
const users = computed(() => usersStore.usersData);

onMounted(() => usersStore.fetchUsers());
</script>

<template>
  <div>
    <RouterLink :to="`/users/create`">Create new user</RouterLink>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ `${user.firstname} ${user.lastname}` }}
        <RouterLink :to="`/users/${user.id}/edit`">Edit</RouterLink>
      </li>
    </ul>
  </div>
</template>
