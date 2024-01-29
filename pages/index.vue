<script lang="ts" setup>
import { listAdvertisementStore } from "~/store/advertisement/list";

const advertisement = listAdvertisementStore();

const modalView = ref({
  open: false,
  id: "",
});

function openModal(id: string) {
  modalView.value.id = id;
  modalView.value.open = true;
}

const advertisements = computed(() => advertisement.advertisements);
const renderPagination = computed(
  () => advertisement.total > advertisement.itemsPerPage,
);
const totalPages = computed(() =>
  Math.ceil(advertisement.total / advertisement.itemsPerPage),
);

watch(
  () => advertisement.page,
  () => advertisement.list(),
);

onBeforeMount(async () => {
  advertisement.$reset();
  await advertisement.list();
});

onUnmounted(() => {
  advertisement.$reset();
});
</script>

<template>
  <v-col>
    <v-row no-gutters justify="center" class="ma-0 pa-2">
      <h2 class="text-primary">Anúncios disponíveis</h2>
    </v-row>

    <v-row no-gutters justify="center">
      <template v-if="advertisement.loading">
        <v-col
          v-for="n in 3"
          :key="n"
          cols="12"
          sm="6"
          md="3"
          class="pa-2 px-xs-4"
        >
          <v-skeleton-loader
            class="mx-auto border"
            max-width="300"
            type="image, article"
          ></v-skeleton-loader>
        </v-col>
      </template>

      <v-row v-else-if="!advertisements.length" justify="center" no-gutters>
        <v-col cols="12" class="text-center">
          <h2 class="mt-16">😕 Nada a exibir</h2>
        </v-col>
      </v-row>

      <v-row
        v-else-if="advertisements.length"
        no-gutters
        justify="center"
        class="mt-4"
        :style="{ maxWidth: '100%' }"
      >
        <v-col
          v-for="(ad, idx) in advertisements"
          :key="idx"
          cols="12"
          sm="6"
          md="3"
          class="pa-2 px-xs-4"
        >
          <AdvertisementCardAdvertisement
            :advertisement="ad"
            hide-actions
            @action="() => openModal(ad.id)"
          />
        </v-col>
      </v-row>
    </v-row>

    <v-row v-if="renderPagination" no-gutters justify="center" class="my-4">
      <v-pagination
        v-model="advertisement.page"
        :length="totalPages"
        :total-visible="5"
      />
    </v-row>

    <v-dialog v-model="modalView.open" width="550">
      <AdvertisementModalViewAdvertisement
        v-if="modalView.open"
        :advertisement-id="modalView.id"
        @close="() => (modalView.open = false)"
      />
    </v-dialog>
  </v-col>
</template>
