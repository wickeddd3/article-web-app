<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { LoginSchema } from "@/schema/auth";
import TextField from "@/components/input/TextField.vue";

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(LoginSchema),
  initialValues: {
    email: "",
    password: "",
  },
});

const onSubmit = handleSubmit((values) => {
  console.log(values);
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
        />
      </div>
      <div>
        <TextField
          name="password"
          label="Password"
          placeholder="••••••••"
          type="password"
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>
