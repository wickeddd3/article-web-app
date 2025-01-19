<script setup lang="ts">
import { useField } from "vee-validate";

export type TextFieldProps = {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
};

const props = withDefaults(defineProps<TextFieldProps>(), {
  label: "",
  type: "text",
  placeholder: "",
  disabled: false,
});

if (!props.name) {
  throw new Error("The `name` prop is required for TextField.");
}

const { value, errorMessage } = useField(props.name);
</script>

<template>
  <label :for="props.name">{{ props.label }}</label>
  <input
    :id="props.name"
    v-model="value"
    :type="props.type"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    :autocomplete="props.name"
  />
  <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
</template>
