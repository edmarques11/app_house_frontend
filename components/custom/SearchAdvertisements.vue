<script setup lang="ts">
import { VTextField, VIcon } from "vuetify/components";

const props = withDefaults(
  defineProps<{
    textFieldProps?: Partial<VTextField>;
    icon?: string;
    iconProps?: Partial<VIcon>;
  }>(),
  {
    textFieldProps: () => ({}),
    icon: "mdi-magnify",
    iconProps: () => ({}),
  },
);

const bindTextField = computed<Partial<VTextField>>(() => ({
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
