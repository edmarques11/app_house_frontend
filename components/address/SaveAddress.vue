<script setup lang="ts">
import { addressStore } from "~/store/address";
const address = addressStore();

const nuxtApp = useNuxtApp();

watch(address.data, ({ zip_code: zipCode }) => {
  getAddress(zipCode);
});

const getAddress = nuxtApp.$debounce(async (zipCode: string) => {
  console.log(zipCode);
  if (!zipCode || zipCode.length !== 8) return;
  await address.getAddressByZipCode(zipCode);
}, 500);
</script>

<template>
  <v-col cols="12" class="pa-0">
    <p class="text-subtitle-1 font-weight-bold text-primary mb-4">
      Insira o endereço do imóvel
    </p>
    <v-text-field
      v-model="address.data.zip_code"
      name="cep"
      type="text"
      label="CEP"
      :error-messages="null"
      class="mb-3"
    />
  </v-col>
</template>
