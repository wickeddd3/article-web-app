<script setup lang="ts">
import SidebarMenuListItem from "@/components/layouts/sidebar/SidebarMenuListItem.vue";
import { sidebarMenu } from "@/components/layouts/sidebar/sidebar-menu.ts";
</script>

<template>
  <div class="sidebar-menu-list">
    <SidebarMenuListItem
      v-for="item in sidebarMenu"
      :key="item.title"
      :title="item.title"
      :link="item.link"
    />
  </div>
</template>
