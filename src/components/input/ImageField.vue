<script setup lang="ts">
import { useField } from "vee-validate";
import { computed } from "vue";

export type LogoFieldProps = {
  name: string;
  accept?: string;
  label?: string;
  required?: boolean;
};

const props = withDefaults(defineProps<LogoFieldProps>(), {
  accept: "image/*", // Default accept to images only
  label: "Upload Logo",
  required: false,
});

if (!props.name) {
  throw new Error("The `name` prop is required for LogoField.");
}

const { value, errorMessage, setTouched } = useField(props.name);

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input?.files && input.files[0]) {
    value.value = input.files[0]; // Set the selected file
  } else {
    value.value = null; // Clear the value if no file selected
  }
};

// Handle blur event
const handleBlur = () => {
  setTouched(true);
};

// Reactive display for the selected file name
const fileName = computed(() =>
  value.value instanceof File ? value.value.name : "No file selected"
);
</script>

<template>
  <div>
    <label :for="props.name">{{ props.label }}</label>
    <input
      :id="props.name"
      type="file"
      :accept="props.accept"
      :required="props.required"
      @change="handleFileChange"
      @blur="handleBlur"
    />
    <p>{{ fileName }}</p>
    <span v-if="errorMessage">{{ errorMessage }}</span>
  </div>
</template>
