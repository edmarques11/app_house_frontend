<script setup lang="ts">
const window = ref(0);

const stepConfig = ref({
  submit: () => {},
  back: () => {},
});

function setStepConfig(config: any): void {
  stepConfig.value = config;
}
</script>

<template>
  <v-col class="full-height pa-0">
    <v-row no-gutters justify="center" style="height: inherit">
      <v-col cols="12" md="5" xl="3" align-self="center">
        <v-card elevation="2" class="ma-3 pa-3">
          <v-window v-model="window">
            <v-window-item>
              <AddressSaveAddress @step-config="(e) => setStepConfig(e)" />
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
    <CustomBottomNavActions
      @return="stepConfig.back"
      @forward="stepConfig.submit"
    />
  </v-col>
</template>

<style scoped>
.full-height {
  height: calc(100dvh - 124px);
}
</style>
