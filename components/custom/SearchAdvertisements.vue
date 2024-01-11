<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    textFieldProps?: Record<string, any>;
    icon?: string;
    iconProps?: Record<string, any>;
  }>(),
  {
    textFieldProps: () => ({}),
    icon: "mdi-magnify",
    iconProps: () => ({}),
  },
);

type TVariant =
  | "underlined"
  | "outlined"
  | "filled"
  | "solo"
  | "solo-inverted"
  | "solo-filled"
  | "plain";

const bindTextField = computed(() => ({
  label: "Onde você quer morar?",
  placeholder: "Estado, cidade, bairro...",
  rounded: true,
  variant: "solo" as TVariant,
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
