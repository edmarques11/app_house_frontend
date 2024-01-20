<script setup lang="ts">
import type { VTextField } from "vuetify/components";

// import {
//   useCurrencyInput,
//   type CurrencyInputOptions,
// } from "vue-currency-input";

const props = defineProps<{
  modelValue: string;
  propsTextField: Partial<VTextField>;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});

const masks = {
  money: {
    mask: [
      "#,##",
      "##,##",
      "###,##",
      "#.###,##",
      "##.###,##",
      "###.###,##",
      "#.###.###,##",
    ],
  },
};
</script>

<template>
  <v-text-field
    v-model="value"
    v-maska:[masks.money]
    v-bind="propsTextField"
    prefix="R$"
  />
</template>
