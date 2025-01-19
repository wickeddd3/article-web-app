<script setup lang="ts">
import { useCompaniesStore } from "@/stores/companies";
import { onMounted, computed } from "vue";

const companiesStore = useCompaniesStore();
const companies = computed(() => companiesStore.companiesData);

onMounted(() => companiesStore.fetchCompanies());
</script>

<template>
  <div>
    <h1>Companies</h1>
    <RouterLink :to="`/companies/create`">Create new company</RouterLink>
    <table>
      <thead>
        <tr>
          <th>Logo</th>
          <th>Name</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="company in companies" :key="company.id">
          <td>
            <img :src="company.logo" width="120px" height="100px" />
          </td>
          <td>{{ company.name }}</td>
          <td>{{ company.status }}</td>
          <td>
            <RouterLink :to="`/companies/${company.id}/edit`">Edit</RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
