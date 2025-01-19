<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { ArticleSchema } from "@/schema/article";
import TextField from "@/components/input/TextField.vue";
import SelectField from "@/components/input/SelectField.vue";
import DateField from "@/components/input/DateField.vue";
import LogoField from "@/components/input/LogoField.vue";
import { useArticlesStore } from "@/stores/articles";
import { useCompaniesStore } from "@/stores/companies";
import { useAuthStore } from "@/stores/auth";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ARTICLE_STATUSES } from "@/constants/options.ts";

const router = useRouter();
const articlesStore = useArticlesStore();
const companiesStore = useCompaniesStore();
const authStore = useAuthStore();
const loading = computed(() => articlesStore.addArticleForm.loading);
const companyOptions = computed(() =>
  companiesStore.companiesData.map(({ id, name }) => ({
    value: id,
    label: name,
  }))
);
const authUser = computed(() => authStore.authUser);

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(ArticleSchema),
  initialValues: {
    writerId: Number(authUser.value?.id),
    companyId: 0,
    title: "",
    link: "",
    date: "",
    content: "",
    status: "ForEdit",
    image: undefined,
  },
});

const onSubmit = handleSubmit(async (values) => {
  const isSuccess = await articlesStore.createArticle(values);
  if (isSuccess) {
    // Redirect to dashboard page
    router.push({ name: "dashboard" });
  }
});

onMounted(() => companiesStore.fetchCompanies());
</script>

<template>
  <div class="container">
    <h1>Create new article</h1>
    <form aria-labelledby="new-article-form" @submit="onSubmit">
      <SelectField
        name="companyId"
        label="Company"
        :options="companyOptions"
        placeholder="Select a company"
      />
      <TextField
        name="title"
        label="Title"
        placeholder="Enter title"
        :disabled="loading"
      />
      <TextField
        name="link"
        label="Link"
        placeholder="Enter link"
        :disabled="loading"
      />
      <DateField name="date" label="Date" placeholder="YYYY-MM-DD" />
      <TextField
        name="content"
        label="Content"
        placeholder="Enter content"
        :disabled="loading"
      />
      <SelectField
        name="status"
        label="Status"
        :options="Object.values(ARTICLE_STATUSES)"
        placeholder="Select a status"
      />
      <LogoField name="image" label="Image" />
      <button type="submit" :disabled="loading">
        {{ loading ? "Loading..." : "Create" }}
      </button>
    </form>
  </div>
</template>
