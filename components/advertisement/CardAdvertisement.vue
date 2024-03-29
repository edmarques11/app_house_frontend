<script lang="ts" setup>
import type { IAdvertisement } from "~/store/advertisement/interfaces/ListAdvertisement.ts";

const props = defineProps<{
  advertisement: IAdvertisement;
  hideActions?: boolean;
}>();

const emits = defineEmits<{
  (e: "action", action: "view" | "edit" | "delete"): void;
}>();

const formatPrice = (price: number): string =>
  price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function getImageUrl(ad: IAdvertisement): string | undefined {
  return ad.images[0].publicUrl;
}

const eventsCard = computed(() => {
  if (props.hideActions)
    return {
      click: () => emits("action", "view"),
    };
  else return {};
});
const addressString = computed(() => {
  const { address } = props.advertisement.immobile;

  return `${address.district}, ${address.city} - ${address.uf}`;
});
</script>

<template>
  <v-card :class="{ 'cursor-pointer': hideActions }" v-on="eventsCard">
    <v-col cols="12">
      <div>
        <v-img
          :src="getImageUrl(props.advertisement)"
          min-width="100%"
          max-width="inherit"
          height="200"
          cover
        />

        <p class="text-primary font-weight-bold text-end mt-4">
          {{ formatPrice(props.advertisement.price) }}
        </p>
      </div>

      <div>
        <p class="mb-4 font-weight-bold text-h6 text-truncate">
          {{ props.advertisement.title }}
        </p>
        <p>
          <v-icon icon="mdi-home-city" class="mr-2" />{{
            props.advertisement.immobile.type
          }}
        </p>
        <p class="text-truncate">
          <v-icon icon="mdi-map-marker" class="mr-2" />{{ addressString }}
        </p>
        <p>
          <v-icon icon="mdi-resize" class="mr-2" />{{
            props.advertisement.width
          }}
          x {{ props.advertisement.length }} m²
        </p>
        <p class="text-truncate">
          <v-icon icon="mdi-home-modern" class="mr-2" />{{
            props.advertisement.references
          }}
        </p>

        <v-row v-if="!hideActions" no-gutters justify="end" class="pa-0 ma-0">
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
                @click="emits('action', 'view')"
              />
            </template>
          </CustomButtonTooltip>
          <!-- <CustomButtonTooltip
            v-bind="{
              tooltipProps: { text: 'Editar', location: 'top' },
            }"
          >
            <template #default="{ bind }">
              <v-icon
                v-bind="{
                  ...bind.propsActivator,
                  color: 'primary',
                  icon: 'mdi-pencil',
                }"
                @click="emits('action', 'edit')"
              />
            </template>
          </CustomButtonTooltip> -->
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
                @click="emits('action', 'delete')"
              />
            </template>
          </CustomButtonTooltip>
        </v-row>
      </div>
    </v-col>
  </v-card>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
