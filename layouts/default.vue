<template>
  <v-app>
    <v-main>
      <v-app-bar class="appbar-default-layout" :elevation="2">App bar dessa bagaça</v-app-bar>
      <slot />
    </v-main>
  </v-app>
</template>

<style>
.appbar-default-layout {
  background-color: red !important;
}
</style>
