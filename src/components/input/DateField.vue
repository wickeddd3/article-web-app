<script setup lang="ts">
import { useField } from "vee-validate";
import { computed } from "vue";

export type DateFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  min?: string; // Minimum date (e.g., "2023-01-01")
  max?: string; // Maximum date (e.g., "2023-12-31")
};

const props = withDefaults(defineProps<DateFieldProps>(), {
  label: "Select Date",
  placeholder: "YYYY-MM-DD",
  required: false,
});

// Ensure the `name` prop is provided
if (!props.name) {
  throw new Error("The `name` prop is required for DateField.");
}

// Initialize vee-validate field
const { value, errorMessage, setTouched } = useField(props.name);

// Reactive attributes for the input
const inputAttributes = computed(() => ({
  type: "date",
  id: props.name,
  name: props.name,
  placeholder: props.placeholder,
  required: props.required,
  min: props.min,
  max: props.max,
}));
</script>

<template>
  <div>
    <!-- Label -->
    <label :for="props.name">{{ props.label }}</label>

    <!-- Date Input -->
    <input
      v-bind="inputAttributes"
      v-model="value"
      @blur="() => setTouched(true)"
    />

    <!-- Error Message -->
    <span v-if="errorMessage">{{ errorMessage }}</span>
  </div>
</template>
