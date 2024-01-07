<script setup lang="ts">
import { addressStore } from "~/store/address";
import { alertStore } from "~/store/alert";
const address = addressStore();
const alert = alertStore();

const nuxtApp = useNuxtApp();

const emit = defineEmits(["step-config"]);

const states = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

const masks = {
  zip_code: { mask: "#####-###" },
};

const validZipCode = ref(false);

watch(
  () => address.data.zip_code,
  (zipCode) => {
    getAddress(zipCode);
  },
);

const getAddress = nuxtApp.$debounce(async (zipCode: string) => {
  try {
    validZipCode.value = false;

    zipCode = zipCode.replace("-", "");
    if (!zipCode || zipCode.length !== 8) return;
    await address.getAddressByZipCode(zipCode);

    validZipCode.value = true;
  } catch (e: any) {
    alert.show("Cep não encontrado", "error");
    validZipCode.value = false;
  }
}, 500);

onBeforeMount(() => {
  emit("step-config", {
    submit: address.saveAddress,
    back: () => {},
  });
});
</script>

<template>
  <v-col cols="12" class="pa-0">
    <p class="text-subtitle-1 font-weight-bold text-primary mb-4">
      Insira o endereço do imóvel
    </p>
    <v-text-field
      v-model="address.data.zip_code"
      v-maska:[masks.zip_code]
      name="cep"
      type="text"
      label="CEP"
      :error-messages="address.errors.zip_code"
      class="mb-3"
    />

    <div v-if="validZipCode">
      <v-select v-model="address.data.uf" :items="states" label="Estado" />

      <v-text-field
        v-model="address.data.district"
        name="district"
        type="text"
        label="Bairro"
        :error-messages="address.errors.district"
        class="mb-3"
      />

      <v-text-field
        v-model="address.data.city"
        name="city"
        type="text"
        label="Cidade"
        :error-messages="address.errors.city"
        class="mb-3"
      />

      <v-text-field
        v-model="address.data.public_place"
        name="public_place"
        type="text"
        label="Logradouro"
        :error-messages="address.errors.public_place"
        class="mb-3"
      />

      <v-text-field
        v-model="address.data.number"
        name="number"
        type="number"
        label="Número"
        :error-messages="address.errors.number"
        class="mb-3"
      />

      <v-text-field
        v-model="address.data.complement"
        name="complement"
        type="text"
        label="Complemento"
        :error-messages="address.errors.complement"
        class="mb-3"
      />
    </div>
  </v-col>
</template>
