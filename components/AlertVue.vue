<script setup lang="ts">
import { alertStore } from "~/store/alert";

const alert = alertStore();

const props = computed(() => alert.props);
</script>

<template>
  <v-alert v-bind="props" class="ma-4 alert-style-config" />
</template>

<style scoped>
.alert-style-config {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
}
</style>
