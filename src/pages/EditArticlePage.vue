<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { EditArticleSchema } from "@/schema/article";
import TextField from "@/components/input/TextField.vue";
import SelectField from "@/components/input/SelectField.vue";
import DateField from "@/components/input/DateField.vue";
import LogoField from "@/components/input/LogoField.vue";
import { useArticlesStore } from "@/stores/articles";
import { useCompaniesStore } from "@/stores/companies";
import { useAuthStore } from "@/stores/auth";
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ARTICLE_STATUSES } from "@/constants/options.ts";
import { isoStringToDate } from "@/utils/date";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const router = useRouter();
const route = useRoute();
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

const { handleSubmit, setValues, values, setFieldValue, errors } = useForm({
  validationSchema: toTypedSchema(EditArticleSchema),
  initialValues: {
    companyId: 0,
    title: "",
    link: "",
    date: "",
    content: "",
    status: "ForEdit",
    newImage: undefined,
  },
});

const onSubmit = handleSubmit(async (values) => {
  const { id, companyId, title, link, date, content, status, newImage } =
    values;
  const formData = {
    companyId,
    editorId: Number(authUser.value?.id),
    title,
    link,
    date,
    content,
    status,
    newImage,
  };
  const isSuccess = await articlesStore.updateArticle(formData, id);
  if (isSuccess) {
    // Redirect to dashboard page
    router.push({ name: "all-media" });
  }
});

const onSetInitialFormData = async () => {
  const id = Number(route.params.id);
  const article = await articlesStore.fetchArticle(id);
  setValues({
    ...article,
    date: isoStringToDate(article.date),
  });
};

onMounted(() => {
  companiesStore.fetchCompanies();
  onSetInitialFormData();
});
</script>

<template>
  <div class="container">
    <h1>Edit article</h1>
    <form aria-labelledby="edit-article-form" @submit="onSubmit">
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
      {{ errors.content }}
      <SelectField
        name="status"
        label="Status"
        :options="Object.values(ARTICLE_STATUSES)"
        placeholder="Select a status"
      />
      <LogoField name="newImage" label="Image" />
      <button type="submit" :disabled="loading">
        {{ loading ? "Loading..." : "Update" }}
      </button>
    </form>
  </div>
</template>
