<script lang="ts" setup>
import { listAdvertisementStore } from "~/store/advertisement/List";
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

const advertisements = computed(() => advertisement.advertisements);
const currentModal = computed(() => {
  const mapModal = {
    view: AdvertisementModalViewAdvertisement,
    edit: AdvertisementModalEditAdvertisement,
    delete: AdvertisementModalConfirm,
  };

  return mapModal[modalAdvertisement.value.modal];
});

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
      <AdvertisementCardAdvertisement
        :advertisement="ad"
        @action="(action) => openModal(action, ad.id)"
      />
    </v-col>

    <v-dialog v-model="modalAdvertisement.open" width="550">
      <component
        :is="currentModal"
        v-if="modalAdvertisement.open"
        :advertisement-id="modalAdvertisement.id"
        @close="() => (modalAdvertisement.open = false)"
      />
    </v-dialog>
  </v-row>
</template>
