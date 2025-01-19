<script setup lang="ts">
import SidebarMenuList from "@/components/layouts/sidebar/SidebarMenuList.vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const logout = () => {
  authStore.logoutUser();
};
</script>

<template>
  <aside class="sidebar-menu">
    <SidebarMenuList />
    <button @click="logout">Log Out</button>
  </aside>
</template>
