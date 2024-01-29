<script setup lang="ts">
import { useDisplay } from "vuetify";
import { loginStore } from "~/store/auth/login";

const login = loginStore();

const { mobile } = useDisplay();

const nuxtApp = useNuxtApp();

const loading = ref(false);
const modalApology = ref({ open: false });

const doLogin = nuxtApp.$debounce(async () => {
  loading.value = true;
  await login.doLogin();
  loading.value = false;
}, 500);

const typeInputPassword = ref("password");

const dBlockButton = computed(() => mobile.value);
const errorsMessage = computed(() => login.errors);
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
  login.$reset();
});
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
        :type="typeInputPassword"
        label="Senha"
        :error-messages="errorsMessage.password"
        class="mb-3"
        @keypress.enter="doLogin"
      >
        <template #append-inner>
          <v-icon @click="toggleTypePasswordInput">{{
            iconActionPassword
          }}</v-icon>
        </template>
      </v-text-field>

      <p
        class="text-primary text-action-recovery"
        @click="() => (modalApology.open = true)"
      >
        Recuperar senha
      </p>

      <v-row no-gutters justify="center" class="mt-3">
        <v-btn
          color="primary"
          :block="dBlockButton"
          :disabled="loading"
          @click="doLogin"
          >Entrar</v-btn
        >
      </v-row>
    </v-col>

    <v-dialog v-model="modalApology.open" width="550">
      <CustomApologyModal />
    </v-dialog>
  </v-container>
</template>

<style scoped lang="scss">
.text-action-recovery:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
