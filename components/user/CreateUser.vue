<script setup lang="ts">
import { useDisplay } from "vuetify";
import { createUserStore } from "~/store/user/create";

const { mobile } = useDisplay();
const nuxtApp = useNuxtApp();
const createUser = createUserStore();

const createUserAction = nuxtApp.$debounce(createUser.create, 500);

const dBlockButton = computed(() => mobile.value);
const errorsMessage = computed(() => createUser.errors);
</script>

<template>
  <v-container class="pa-0">
    <v-col class="pa-0">
      <v-text-field
        v-model="createUser.name"
        name="name"
        type="text"
        label="Nome Completo"
        :error-messages="errorsMessage.name"
        class="mb-3"
      />

      <v-row no-gutters justify="center" class="mt-3">
        <v-btn color="primary" :block="dBlockButton" @click="createUserAction"
          >Entrar</v-btn
        >
      </v-row>
    </v-col>
  </v-container>
</template>
