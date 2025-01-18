<script setup lang="ts">
import SidebarMenu from "@/components/layouts/sidebar/SidebarMenu.vue";
</script>

<template>
  <main class="main-layout">
    <SidebarMenu />
    <div class="main-layout__content">
      <RouterView />
    </div>
  </main>
</template>
