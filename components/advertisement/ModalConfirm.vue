<script lang="ts" setup>
const emits = defineEmits<{
  (e: "close"): void;
  (e: "confirm"): void;
}>();
</script>

<template>
  <v-card>
    <v-col cols="12" class="pa-6">
      <p class="text-primary font-weight-bold mb-2">
        Você realmente deseja executar esta ação?
      </p>
      <p class="text-subtitle-2">
        Atenção: esta ação não poderá ser revertida.
      </p>

      <v-row no-gutters justify="end" class="mt-6">
        <v-btn elevation="0" @click="() => emits('close')">cancelar</v-btn>
        <v-btn elevation="0" color="primary" @click="() => emits('confirm')"
          >confirmar</v-btn
        >
      </v-row>
    </v-col>
  </v-card>
</template>
