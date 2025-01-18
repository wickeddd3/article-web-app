<script setup lang="ts">
import SidebarMenu from "@/components/layouts/sidebar/SidebarMenu.vue";
import { useAuthStore } from "@/stores/auth";
import { onMounted } from "vue";

const authStore = useAuthStore();

onMounted(() => authStore.fetchAuthUser());
</script>

<template>
  <main class="main-layout">
    <SidebarMenu />
    <div class="main-layout__content">
      <RouterView />
    </div>
  </main>
</template>
