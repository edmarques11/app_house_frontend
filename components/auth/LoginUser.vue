<script setup lang="ts">
import { useDisplay } from "vuetify";
import { loginStore } from "~/store/auth/login";

const login = loginStore();

const { mobile } = useDisplay();

const dBlockButton = computed(() => mobile.value);
const errorsMessage = computed(() => login.errors);
</script>

<template>
  <v-container class="pa-0">
    <v-col class="pa-0">
      <v-text-field
        v-model="login.username"
        name="email"
        type="email"
        label="Email"
        :error-messages="errorsMessage.username"
        class="mb-3"
      />
      <v-text-field
        v-model="login.password"
        name="password"
        type="password"
        label="Senha"
        :error-messages="errorsMessage.password"
        class="mb-3"
      />

      <v-row no-gutters justify="center" class="mt-3">
        <v-btn color="primary" :block="dBlockButton" @click="login.doLogin"
          >Entrar</v-btn
        >
      </v-row>
    </v-col>
  </v-container>
</template>
