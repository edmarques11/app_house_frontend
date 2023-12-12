<script setup lang="ts">
const props = defineProps({
  textFieldProps: {
    type: Object,
    default: () => ({}),
  },
  icon: {
    type: String,
    default: "mdi-magnify",
  },
  iconProps: {
    type: Object,
    default: () => ({}),
  },
});

const bindTextField = computed(() => ({
  label: "Onde você quer morar?",
  placeholder: "Estado, cidade, bairro...",
  rounded: true,
  variant: "solo",
  ...props.textFieldProps,
}));
const bindIcon = computed(() => ({ ...props.iconProps }));
</script>

<template>
  <v-text-field v-bind="bindTextField">
    <template #append-inner>
      <v-icon v-bind="bindIcon" @click="() => {}">{{ icon }}</v-icon>
    </template>
  </v-text-field>
</template>
