<script setup lang="ts">
import { saveImmobileStore } from "~/store/immobile/save";
const saveImmobile = saveImmobileStore();
const emit = defineEmits(["step-config"]);

const typeItems = computed(() => [
  "Casa residencial",
  "Apartamento",
  "Kitnet",
  "Sobrado",
  "Casa de condomínio",
  "Flat",
  "Hotel",
]);

onBeforeMount(() => {
  emit("step-config", {
    submit: saveImmobile.save,
    back: () => true,
  });
});
</script>

<template>
  <v-col cols="12" class="pa-0">
    <p class="text-subtitle-1 font-weight-bold text-primary mb-4">
      Cadastre seu imóvel
    </p>

    <v-select
      v-model="saveImmobile.data.type"
      name="tipo"
      type="text"
      label="Tipo"
      :items="typeItems"
      :error-messages="saveImmobile.errors.type"
      class="mb-3"
    />
  </v-col>
</template>
