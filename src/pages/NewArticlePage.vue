<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { ArticleSchema } from "@/schema/article";
import TextField from "@/components/input/TextField.vue";
import SelectField from "@/components/input/SelectField.vue";
import DateField from "@/components/input/DateField.vue";
import ImageField from "@/components/input/ImageField.vue";
import { useArticlesStore } from "@/stores/articles";
import { useCompaniesStore } from "@/stores/companies";
import { useAuthStore } from "@/stores/auth";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { getCurrentDateString } from "@/utils/date";

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

const { handleSubmit, values, setFieldValue, errors } = useForm({
  validationSchema: toTypedSchema(ArticleSchema),
  initialValues: {
    companyId: 0,
    title: "",
    link: "",
    date: getCurrentDateString(),
    content: "",
    status: "ForEdit",
    image: undefined,
  },
});

const onSubmit = handleSubmit(async (values) => {
  const formData = {
    ...values,
    writerId: Number(authUser.value?.id),
  };
  const isSuccess = await articlesStore.createArticle(formData);
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
      <QuillEditor
        :content="values.content"
        theme="snow"
        content-type="html"
        toolbar="minimal"
        @update:content="(value) => setFieldValue('content', value)"
      />
      <span class="error-message">{{ errors.content }}</span>
      <ImageField name="image" label="Image" />
      <button type="submit" :disabled="loading">
        {{ loading ? "Loading..." : "Create" }}
      </button>
    </form>
  </div>
</template>
