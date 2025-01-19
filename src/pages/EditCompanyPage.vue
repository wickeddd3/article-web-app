<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { EditCompanySchema } from "@/schema/company";
import TextField from "@/components/input/TextField.vue";
import SelectField from "@/components/input/SelectField.vue";
import ImageField from "@/components/input/ImageField.vue";
import { useCompaniesStore } from "@/stores/companies";
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { STATUSES } from "@/constants/options.ts";

const router = useRouter();
const route = useRoute();
const companiesStore = useCompaniesStore();
const loading = computed(() => companiesStore.addCompanyForm.loading);

const { handleSubmit, setValues } = useForm({
  validationSchema: toTypedSchema(EditCompanySchema),
  initialValues: {
    name: "",
    status: "Active",
    newLogo: undefined,
  },
});

const onSubmit = handleSubmit(async (values) => {
  const { id, name, status, newLogo } = values;
  const formData = { name, status, newLogo };
  const isSuccess = await companiesStore.updateCompany(formData, id);
  if (isSuccess) {
    // Redirect to companies page
    router.push({ name: "companies" });
  }
});

const onSetInitialFormData = async () => {
  const id = Number(route.params.id);
  const company = await companiesStore.fetchCompany(id);
  setValues(company);
};

onMounted(() => onSetInitialFormData());
</script>

<template>
  <div class="container">
    <h1>Edit company</h1>
    <form aria-labelledby="edit-company-form" @submit="onSubmit">
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
      <ImageField name="newLogo" label="Company Logo" />
      <button type="submit" :disabled="loading">
        {{ loading ? "Loading..." : "Update" }}
      </button>
    </form>
  </div>
</template>
