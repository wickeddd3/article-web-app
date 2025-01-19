<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { CompanySchema } from "@/schema/company";
import TextField from "@/components/input/TextField.vue";
import SelectField from "@/components/input/SelectField.vue";
import ImageField from "@/components/input/ImageField.vue";
import { useCompaniesStore } from "@/stores/companies";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { STATUSES } from "@/constants/options.ts";

const router = useRouter();
const companiesStore = useCompaniesStore();
const loading = computed(() => companiesStore.addCompanyForm.loading);

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(CompanySchema),
  initialValues: {
    name: "",
    status: "Active",
    logo: undefined,
  },
});

const onSubmit = handleSubmit(async (values) => {
  const isSuccess = await companiesStore.createCompany(values);
  if (isSuccess) {
    // Redirect to companies page
    router.push({ name: "companies" });
  }
});
</script>

<template>
  <div class="container">
    <h1>Create new company</h1>
    <form aria-labelledby="new-company-form" @submit="onSubmit">
      <TextField
        name="name"
        label="Name"
        placeholder="Enter company name"
        :disabled="loading"
      />
      <SelectField
        name="status"
        label="Status"
        :options="Object.values(STATUSES)"
        placeholder="Select a status"
      />
      <ImageField name="logo" label="Company Logo" />
      <button type="submit" :disabled="loading">
        {{ loading ? "Loading..." : "Create" }}
      </button>
    </form>
  </div>
</template>
