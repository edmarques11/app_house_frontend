<script setup lang="ts">
import { ref } from "vue";

const loginData = ref({
  email: "",
  password: "",
});

const doLogin = (): void => {
  console.log(loginData.value);
};
</script>

<template>
  <v-container class="pa-0">
    <v-col class="pa-0">
      <v-text-field
        v-model="loginData.email"
        name="email"
        type="email"
        label="Email"
      />
      <v-text-field
        v-model="loginData.password"
        name="password"
        type="password"
        label="Senha"
      />

      <v-row no-gutters justify="center" class="mt-3">
        <v-btn color="primary" @click="doLogin">Entrar</v-btn>
      </v-row>
    </v-col>
  </v-container>
</template>
