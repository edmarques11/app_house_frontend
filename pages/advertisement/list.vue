<script lang="ts" setup>
import { listAdvertisementStore } from "~/store/advertisement/list";
import {
  AdvertisementModalViewAdvertisement,
  AdvertisementModalEditAdvertisement,
  AdvertisementModalConfirm,
} from "#components";

const advertisement = listAdvertisementStore();

type IModal = "view" | "edit" | "delete";
const modalAdvertisement = ref<{
  modal: IModal;
  id: string;
  open: boolean;
}>({
  modal: "view",
  id: "",
  open: false,
});

function openModal(modal: IModal, id: string) {
  modalAdvertisement.value.modal = modal;
  modalAdvertisement.value.id = id;
  modalAdvertisement.value.open = true;
}

async function confirmAction() {
  const mapActions = {
    delete: async () =>
      await advertisement.deleteAdvertisement(modalAdvertisement.value.id),
    edit: () => {},
    view: () => {},
  };
  const modal = modalAdvertisement.value.modal;

  await mapActions[modal]();
  modalAdvertisement.value.open = false;
  await advertisement.list(1);
}

const advertisements = computed(() => advertisement.advertisements);
const currentModal = computed(() => {
  const mapModal = {
    view: AdvertisementModalViewAdvertisement,
    edit: AdvertisementModalEditAdvertisement,
    delete: AdvertisementModalConfirm,
  };

  return mapModal[modalAdvertisement.value.modal];
});
const renderPagination = computed(
  () => advertisement.total > advertisement.itemsPerPage,
);
const totalPages = computed(() =>
  Math.ceil(advertisement.total / advertisement.itemsPerPage),
);

watch(
  () => advertisement.page,
  () => advertisement.list(1),
);

onBeforeMount(async () => {
  advertisement.$reset();
  await advertisement.list(1);
});
onUnmounted(() => {
  advertisement.$reset();
});
</script>

<template>
  <v-row no-gutters justify="center" class="my-4">
    <v-col cols="12" class="ma-0 pa-2 text-center">
      <h2 class="text-primary">Seus anúncios</h2>
    </v-col>

    <v-col
      v-for="(ad, idx) in advertisements"
      :key="idx"
      cols="12"
      sm="6"
      md="3"
      class="pa-2"
    >
      <AdvertisementCardAdvertisement
        :advertisement="ad"
        @action="(action) => openModal(action, ad.id)"
      />
    </v-col>

    <v-col v-if="renderPagination" cols="12" class="mx-0 my-4 pa-2 text-center">
      <v-pagination
        v-model="advertisement.page"
        :length="totalPages"
        :total-visible="5"
      />
    </v-col>

    <v-dialog v-model="modalAdvertisement.open" width="550">
      <component
        :is="currentModal"
        v-if="modalAdvertisement.open"
        :advertisement-id="modalAdvertisement.id"
        @close="() => (modalAdvertisement.open = false)"
        @confirm="confirmAction"
      />
    </v-dialog>
  </v-row>
</template>
