<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
  layout: "empty-layout",
});

const tab = ref(0);
</script>

<template>
  <div class="content-auth">
    <v-row no-gutters justify="center">
      <v-col cols="12" sm="8" md="6" lg="4" xl="3" class="px-6 px-md-0">
        <v-card class="pa-6">
          <v-tabs v-model="tab">
            <v-tab :value="0"> Login </v-tab>
            <v-tab :value="1"> Cadastro </v-tab>
          </v-tabs>

          <v-card-text class="pa-0 mt-6">
            <v-window v-model="tab">
              <v-window-item :value="0">
                <AuthLoginUser />
              </v-window-item>

              <v-window-item :value="1">
                <h1>cadastro</h1>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.content-auth {
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
