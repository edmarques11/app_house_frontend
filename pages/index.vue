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
  advertisement.itemsPerPage = 3;
  await advertisement.list();
});
</script>

<template>
  <v-col>
    <v-row no-gutters justify="center">
      <v-col v-if="!advertisements.length" cols="12" md="5">
        <h1>Nada a exibir 😕</h1>
      </v-col>

      <v-row
        v-if="advertisements.length"
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
          class="ma-2 mx-xs-4"
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
