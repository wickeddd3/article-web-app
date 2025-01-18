<script setup lang="ts">
import { useCompaniesStore } from "@/stores/companies";
import { onMounted, computed } from "vue";

const companiesStore = useCompaniesStore();
const companies = computed(() => companiesStore.companiesData);

onMounted(() => companiesStore.fetchCompanies());
</script>

<template>
  <div>
    <RouterLink :to="`/companies/create`">Create new company</RouterLink>
    <ul>
      <li v-for="company in companies" :key="company.id">
        {{ company.name }}
        <RouterLink :to="`/companies/${company.id}/edit`">Edit</RouterLink>
      </li>
    </ul>
  </div>
</template>
