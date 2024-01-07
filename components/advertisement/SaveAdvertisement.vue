<script setup lang="ts">
import { advertisementStore } from "~/store/advertisement/save";

const advertisement = advertisementStore();
const emit = defineEmits(["step-config"]);

onBeforeMount(() => {
  emit("step-config", {
    submit: advertisement.save,
    back: () => true,
  });
});
</script>

<template>
  <v-col cols="12" class="pa-0">
    <p class="text-subtitle-1 font-weight-bold text-primary mb-4">
      Cadastre seu anúncio
    </p>

    <v-text-field
      v-model="advertisement.data.title"
      name="title"
      type="text"
      label="Título"
      :error-messages="advertisement.errors.title"
      class="mb-3"
    />

    <v-text-field
      v-model="advertisement.data.description"
      name="description"
      type="text"
      label="Descrição"
      :error-messages="advertisement.errors.description"
      class="mb-3"
    />

    <v-text-field
      v-model="advertisement.data.width"
      name="width"
      type="text"
      label="Largura"
      :error-messages="advertisement.errors.width"
      class="mb-3"
    />

    <v-text-field
      v-model="advertisement.data.length"
      name="length"
      type="text"
      label="Comprimento"
      :error-messages="advertisement.errors.length"
      class="mb-3"
    />

    <v-text-field
      v-model="advertisement.data.references"
      name="references"
      type="text"
      label="Referências"
      :error-messages="advertisement.errors.references"
      class="mb-3"
    />

    <v-text-field
      v-model="advertisement.data.phone_contact"
      name="phone_contact"
      type="text"
      label="Telefone para contato"
      :error-messages="advertisement.errors.phone_contact"
      class="mb-3"
    />

    <v-text-field
      v-model="advertisement.data.price"
      name="price"
      type="text"
      label="Preço (mensal)"
      :error-messages="advertisement.errors.price"
      class="mb-3"
    />
  </v-col>
</template>
