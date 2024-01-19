<script lang="ts" setup>
import { viewAdvertisementStore } from "~/store/advertisement/view";
const advertisementStore = viewAdvertisementStore();

const props = defineProps<{
  advertisementId: string;
}>();

const emits = defineEmits<{
  (e: "close"): void;
}>();

const formatPrice = (price: number): string =>
  price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const advertisement = computed(() => advertisementStore.data);
const images = computed(() => advertisement.value.images);

onBeforeMount(async () => {
  await advertisementStore.getAdvertisement(props.advertisementId);
});
</script>

<template>
  <v-card>
    <v-col cols="12" class="pa-6">
      <p class="font-weight-bold text-primary text-h6 mb-4">
        {{ advertisement.title }}
      </p>

      <p class="text-subtitle-2 mb-4">
        <b class="text-primary">Descrição:</b> {{ advertisement.description }}
      </p>

      <p class="text-subtitle-2 mb-4">
        <b class="text-primary">Referências:</b> {{ advertisement.references }}
      </p>

      <p class="text-subtitle-2 mb-4">
        <b class="text-primary">Contato:</b> {{ advertisement.phone_contact }}
      </p>

      <p class="text-subtitle-2 mb-4">
        <b class="text-primary">Preço:</b>
        {{ formatPrice(advertisement.price) }}
        <span class="text-caption">(mensal)</span>
      </p>

      <p class="text-subtitle-2 mb-4">
        <b class="text-primary">Dimensões:</b> {{ advertisement.width }} x
        {{ advertisement.length }} m²
      </p>

      <p class="text-subtitle-1 font-weight-bold text-primary mb-0">
        Imagens do anúncio
      </p>

      <v-carousel
        v-if="images.length"
        height="250"
        :show-arrows="false"
        hide-delimiter-background
        delimiter-icon="mdi-square"
        touch
      >
        <v-carousel-item
          v-for="(img, idx) in images"
          :key="idx"
          :src="img.publicUrl"
          :value="img.id"
        />
      </v-carousel>

      <v-row no-gutters justify="end" class="mt-6">
        <v-btn color="primary" elevation="0" @click="emits('close')"
          >fechar</v-btn
        >
      </v-row>
    </v-col>
  </v-card>
</template>
