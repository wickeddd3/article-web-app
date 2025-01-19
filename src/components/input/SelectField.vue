<script setup lang="ts">
import { useField } from "vee-validate";

export type SelectOption =
  | string // Allow string values
  | { label: string; value: string | number }; // Allow objects with label and value

export type SelectFieldProps = {
  label?: string;
  name: string;
  options: SelectOption[]; // Array of strings or objects
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

// Utility function to extract the label and value for rendering
const getOptionDisplay = (option: SelectOption) => {
  if (typeof option === "string") {
    return { label: option, value: option }; // For strings, use the same value as the label
  }
  return { label: option.label, value: option.value }; // For objects, use the provided label and value
};
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
      <option
        v-for="option in props.options"
        :key="typeof option === 'string' ? option : option.value"
        :value="getOptionDisplay(option).value"
      >
        {{ getOptionDisplay(option).label }}
      </option>
    </select>
    <span v-if="errorMessage">{{ errorMessage }}</span>
  </div>
</template>
