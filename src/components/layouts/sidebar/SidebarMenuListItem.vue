<script setup lang="ts">
export type SidebarMenuListItemProps = {
  title: string;
  link: string;
};

const props = defineProps<SidebarMenuListItemProps>();

if (!props.title) {
  throw new Error("The `title` prop is required for SidebarMenuListItem.");
}

if (!props.link) {
  throw new Error("The `link` prop is required for SidebarMenuListItem.");
}
</script>

<template>
  <div class="sidebar-menu-list__item">
    <RouterLink :to="props.link">{{ props.title }}</RouterLink>
  </div>
</template>
