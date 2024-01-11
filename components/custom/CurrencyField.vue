<script setup lang="ts">
import {
  useCurrencyInput,
  type CurrencyInputOptions,
} from "vue-currency-input";

const props = defineProps<{
  options: CurrencyInputOptions;
  modelValue: number;
}>();

const inputRef = useCurrencyInput(props.options);
</script>

<template>
  <input ref="inputRef" type="text" />
</template>
