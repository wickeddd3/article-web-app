<script setup lang="ts">
import { useField } from "vee-validate";

export type SelectFieldProps = {
  label?: string;
  name: string;
  options: string[];
  placeholder?: string;
  disabled?: boolean;
};

const props = withDefaults(defineProps<SelectFieldProps>(), {
  label: "",
  placeholder: "",
  disabled: false,
});

if (!props.name) {
  throw new Error("The `name` prop is required for SelectField.");
}

const { value, errorMessage } = useField(props.name);
</script>

<template>
  <div>
    <label :for="props.name">{{ props.label }}</label>
    <select
      :id="props.name"
      v-model="value"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
    >
      <option v-if="props.placeholder" value="" disabled>
        {{ props.placeholder }}
      </option>
      <option v-for="option in props.options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
    <span v-if="errorMessage">{{ errorMessage }}</span>
  </div>
</template>
