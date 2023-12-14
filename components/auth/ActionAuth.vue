<script setup lang="ts">
const cookieAuth = useCookie("authorization");
const router = useRouter();
const nuxtApp = useNuxtApp();

type ConfigItem = {
  icon: string;
  title: string;
  action: () => void;
};

const actionAuth: ConfigItem = !cookieAuth.value
  ? {
      icon: "mdi-login",
      title: "Login",
      action: () => router.push({ path: "/auth" }),
    }
  : {
      icon: "mdi-logout",
      title: "Logout",
      action: nuxtApp.$logout,
    };

const itemsList = computed(
  () =>
    [
      {
        icon: "mdi-account-circle",
        title: "Perfil",
        action: () => {},
      },
      actionAuth,
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
        :key="index"
        @click="item.action"
      >
        <template #prepend>
          <v-icon :icon="item.icon" />
        </template>

        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
