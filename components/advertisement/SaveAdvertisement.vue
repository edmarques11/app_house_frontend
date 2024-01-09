<script setup lang="ts">
import { advertisementStore } from "~/store/advertisement/save";

const advertisement = advertisementStore();
const emit = defineEmits(["step-config"]);

const images = computed(() => advertisement.data.images);

const inputImageAdvertisement = ref<HTMLInputElement | null>(null);

function selectImage() {
  inputImageAdvertisement.value?.click();
}

async function uploadImage(e: Event) {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    try {
      await advertisement.uploadImage(file);
    } catch {
    } finally {
      target.value = "";
    }
  }
}

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

    <p class="text-subtitle-2 font-weight-bold text-primary mb-4">
      Adicione imagens do anúncio
    </p>

    <v-row no-gutters class="mb-2">
      <v-btn
        icon="mdi-image-plus-outline"
        color="primary"
        class="ml-2"
        @click="selectImage"
      />
      <v-btn
        icon="mdi-delete"
        color="red"
        class="ml-2"
        :disabled="!images.length"
      />
    </v-row>

    <input
      ref="inputImageAdvertisement"
      class="d-none"
      type="file"
      @input="uploadImage"
    />

    <v-carousel v-if="images.length" height="250">
      <v-carousel-item
        v-for="(img, idx) in images"
        :key="idx"
        :lazy-src="img"
        cover
      />
    </v-carousel>
  </v-col>
</template>
