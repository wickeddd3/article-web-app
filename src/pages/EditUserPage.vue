<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { EditUserSchema } from "@/schema/user";
import TextField from "@/components/input/TextField.vue";
import SelectField from "@/components/input/SelectField.vue";
import { useUsersStore } from "@/stores/users";
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { STATUSES, USER_TYPES } from "@/constants/options.ts";

const router = useRouter();
const route = useRoute();
const usersStore = useUsersStore();
const loading = computed(() => usersStore.addUserForm.loading);

const { handleSubmit, setValues } = useForm({
  validationSchema: toTypedSchema(EditUserSchema),
  initialValues: {
    id: "",
    firstname: "",
    lastname: "",
    type: "",
    status: "",
    email: "",
    password: "",
  },
});

const onSubmit = handleSubmit(async (values) => {
  const { id, firstname, lastname, type, status, email, password } = values;
  const formData = { firstname, lastname, type, status, email, password };
  const isSuccess = await usersStore.updateUser(formData, id);
  if (isSuccess) {
    // Redirect to users page
    router.push({ name: "users" });
  }
});

const onSetInitialFormData = async () => {
  const id = route.params.id;
  const user = await usersStore.fetchUser(id);
  setValues(user);
};

onMounted(() => onSetInitialFormData());
</script>

<template>
  <div class="container">
    <h1>Edit user</h1>
    <form aria-labelledby="new-user-form" @submit="onSubmit">
      <TextField
        name="firstname"
        label="First Name"
        placeholder="Enter first name"
        :disabled="loading"
      />
      <TextField
        name="lastname"
        label="Last Name"
        placeholder="Enter last name"
        :disabled="loading"
      />
      <SelectField
        name="type"
        label="Type"
        :options="Object.values(USER_TYPES)"
        placeholder="Select user type"
      />
      <SelectField
        name="status"
        label="Status"
        :options="Object.values(STATUSES)"
        placeholder="Select a status"
      />
      <TextField
        name="email"
        label="Email Address"
        placeholder="Enter your email"
        :disabled="loading"
      />
      <TextField
        name="password"
        label="Password"
        placeholder="••••••••"
        type="password"
        :disabled="loading"
      />
      <button type="submit" :disabled="loading">
        {{ loading ? "Loading..." : "Create" }}
      </button>
    </form>
  </div>
</template>
