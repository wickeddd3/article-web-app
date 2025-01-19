<script setup lang="ts">
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";

export type SidebarMenuListItemProps = {
  title: string;
  link: string;
  access: string[];
};

const props = defineProps<SidebarMenuListItemProps>();

if (!props.title) {
  throw new Error("The `title` prop is required for SidebarMenuListItem.");
}

if (!props.link) {
  throw new Error("The `link` prop is required for SidebarMenuListItem.");
}

const authStore = useAuthStore();
const authUser = computed(() => authStore.authUser);
const hasAccess = computed(
  () => authUser.value && props.access.includes(authUser.value?.type)
);
</script>

<template>
  <div v-if="hasAccess" class="sidebar-menu-list__item">
    <RouterLink :to="props.link">{{ props.title }}</RouterLink>
  </div>
</template>
