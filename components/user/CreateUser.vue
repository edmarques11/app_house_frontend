<script setup lang="ts">
import { useDisplay } from "vuetify";
import { createUserStore } from "~/store/user/create";

const { mobile } = useDisplay();
const nuxtApp = useNuxtApp();
const createUser = createUserStore();

const typeInputPassword = ref("password");
const createUserAction = nuxtApp.$debounce(createUser.create, 500);

const dBlockButton = computed(() => mobile.value);
const errorsMessage = computed(() => createUser.errors);
const iconActionPassword = computed(() =>
  typeInputPassword.value === "password"
    ? "mdi-eye-outline"
    : "mdi-eye-off-outline",
);

const toggleTypePasswordInput = () => {
  const types = ["password", "text"];
  const index = types.indexOf(typeInputPassword.value);

  typeInputPassword.value = types[index === 0 ? 1 : 0];
};

onUnmounted(() => {
  createUser.$reset();
});
</script>

<template>
  <v-container class="pa-0">
    <v-col class="pa-0">
      <v-text-field
        v-model="createUser.data.name"
        name="name"
        type="text"
        label="Nome Completo"
        :error-messages="errorsMessage.name"
        class="mb-3"
      />
      <v-text-field
        v-model="createUser.data.email"
        name="email"
        type="text"
        label="Email"
        :error-messages="errorsMessage.email"
        class="mb-3"
      />
      <v-text-field
        v-model="createUser.data.password"
        name="password"
        :type="typeInputPassword"
        label="Senha"
        :error-messages="errorsMessage.password"
        class="mb-3"
      >
        <template #append-inner>
          <v-icon @click="toggleTypePasswordInput">{{
            iconActionPassword
          }}</v-icon>
        </template>
      </v-text-field>

      <v-row no-gutters justify="center" class="mt-3">
        <v-btn color="primary" :block="dBlockButton" @click="createUserAction"
          >cadastrar</v-btn
        >
      </v-row>
    </v-col>
  </v-container>
</template>
