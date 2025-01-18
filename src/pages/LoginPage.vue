<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { LoginSchema } from "@/schema/auth";
import TextField from "@/components/input/TextField.vue";
import { useAuthStore } from "@/stores/auth";
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const loading = computed(() => authStore.loginForm.loading);

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(LoginSchema),
  initialValues: {
    email: "",
    password: "",
  },
});

const onSubmit = handleSubmit(async (values) => {
  const isSuccess = await authStore.loginUser(values);
  if (isSuccess) {
    // Redirect to home page
    router.push({ name: "dashboard" });
  }
});
</script>

<template>
  <div class="container">
    <h1>Login</h1>
    <form aria-labelledby="login-form" @submit="onSubmit">
      <div>
        <TextField
          name="email"
          label="Email Address"
          placeholder="Enter your email"
          :disabled="loading"
        />
      </div>
      <div>
        <TextField
          name="password"
          label="Password"
          placeholder="••••••••"
          type="password"
          :disabled="loading"
        />
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? "Loading..." : "Login" }}
      </button>
    </form>
  </div>
</template>
