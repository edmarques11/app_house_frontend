<script setup lang="ts">
definePageMeta({
  layout: "empty-layout",
});

import { ref } from "vue";

const tab = ref(0);
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <v-card height="80dvh" class="pa-6">
          <v-tabs v-model="tab">
            <v-tab :value="0"> Login </v-tab>
            <v-tab :value="1"> Cadastro </v-tab>
          </v-tabs>

          <v-card-text class="pa-0 mt-6">
            <v-window v-model="tab">
              <v-window-item :value="0">
                <AuthLogin />
              </v-window-item>

              <v-window-item :value="1">
                <h1>cadastro</h1>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
