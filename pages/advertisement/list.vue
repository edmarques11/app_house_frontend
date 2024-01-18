<script lang="ts" setup>
import { listAdvertisementStore } from "~/store/advertisement/List";
import type { IAdvertisement } from "~/store/advertisement/interfaces/ListAdvertisement.ts";

const advertisement = listAdvertisementStore();

const formatPrice = (price: number) =>
  price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const advertisements = computed(() => advertisement.advertisements);

function getImageUrl(ad: IAdvertisement) {
  return ad.images[0].publicUrl;
}

onBeforeMount(async () => {
  await advertisement.list();
});
</script>

<template>
  <v-row no-gutters justify="center" class="mt-4">
    <v-col
      v-for="(ad, idx) in advertisements"
      :key="idx"
      cols="12"
      sm="6"
      md="3"
    >
      <v-card>
        <v-col>
          <v-img :src="getImageUrl(ad)" width="auto" max-height="250" cover />

          <p class="text-primary font-weight-bold text-end mt-4">
            {{ formatPrice(ad.price) }}
          </p>
          <p class="mb-4 font-weight-bold text-h6">{{ ad.title }}</p>
          <p>
            <v-icon icon="mdi-home-city" class="mr-2" />{{ ad.immobile.type }}
          </p>
          <p>
            <v-icon icon="mdi-resize" class="mr-2" />{{ ad.width }} x
            {{ ad.length }} m²
          </p>

          <v-row no-gutters justify="end" class="pa-0 ma-0">
            <CustomButtonTooltip
              v-bind="{
                tooltipProps: { text: 'Detalhes', location: 'top' },
              }"
            >
              <template #default="{ bind }">
                <v-icon
                  v-bind="{
                    ...bind.propsActivator,
                    color: 'primary',
                    icon: 'mdi-eye',
                  }"
                />
              </template>
            </CustomButtonTooltip>
            <CustomButtonTooltip
              v-bind="{
                tooltipProps: { text: 'Apagar', location: 'top' },
              }"
            >
              <template #default="{ bind }">
                <v-icon
                  v-bind="{
                    ...bind.propsActivator,
                    color: 'red',
                    icon: 'mdi-delete',
                  }"
                />
              </template>
            </CustomButtonTooltip>
          </v-row>
        </v-col>
      </v-card>
    </v-col>
  </v-row>
</template>
