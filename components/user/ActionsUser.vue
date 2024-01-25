<script setup lang="ts">
import { useDisplay } from "vuetify";

const cookieAuth = useCookie("authorization");
const router = useRouter();
const nuxtApp = useNuxtApp();
const route = useRoute();

const { xs: mobile } = useDisplay();

type ConfigItem = {
  icon: string;
  title: string;
  isVisible: boolean;
  color: string;
  action: () => void;
};

const itemsList = computed(
  () =>
    [
      {
        icon: "mdi-account-circle",
        title: "Perfil",
        isVisible: false,
        color: "black",
        action: () => {},
      },
      {
        icon: "mdi-list-box",
        title: "Ver anúncios disponíveis",
        isVisible: mobile.value,
        color: route.name === "index" ? "primary" : "black",
        action: () => router.push({ path: "/" }),
      },
      {
        icon: "mdi-home-plus",
        title: "Criar novo anúncio",
        isVisible: mobile.value,
        color: route.name === "advertisement-create" ? "primary" : "black",
        action: () => router.push({ path: "/advertisement/create" }),
      },
      {
        icon: "mdi-folder-home",
        title: "Seus anúncios",
        isVisible: mobile.value,
        color: route.name === "advertisement-list" ? "primary" : "black",
        action: () => router.push({ path: "/advertisement/list" }),
      },
      {
        icon: "mdi-login",
        title: "Login",
        isVisible: !cookieAuth.value,
        color: "black",
        action: () => router.push({ path: "/auth" }),
      },
      {
        icon: "mdi-logout",
        title: "Logout",
        isVisible: !!cookieAuth.value,
        color: "black",
        action: nuxtApp.$logout,
      },
    ] as ConfigItem[],
);
</script>

<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn v-bind="{ ...props, icon: 'mdi-account' }" />
    </template>
    <v-list>
      <v-list-item
        v-for="(item, index) in itemsList"
        v-show="item.isVisible"
        :key="index"
        @click="item.action"
      >
        <template #prepend>
          <v-icon :icon="item.icon" :color="item.color" />
        </template>

        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
