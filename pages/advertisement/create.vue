<script setup lang="ts">
import {
  AddressSaveAddress,
  ImmobileSaveImmobile,
  AdvertisementSaveAdvertisement,
} from "#components";
const step = ref(0);
const steps = [
  AddressSaveAddress,
  ImmobileSaveImmobile,
  AdvertisementSaveAdvertisement,
];

const stepConfig = ref({
  submit: () => Promise<void>,
  back: () => false,
});

function setStepConfig(config: any): void {
  stepConfig.value = config;
}

async function executeSubmit(): Promise<void> {
  try {
    await stepConfig.value.submit();

    if (step.value < steps.length - 1) {
      step.value++;
    }
  } catch {}
}
function executeBack(): void {
  const back = stepConfig.value.back();

  if (back && step.value > 0) {
    step.value--;
  }
}
</script>

<template>
  <v-col class="full-height pa-0">
    <v-row no-gutters justify="center" style="height: inherit">
      <v-col cols="12" md="5" xl="3" align-self="center">
        <v-card elevation="2" class="ma-3 pa-3">
          <v-window v-model="step">
            <v-window-item v-for="(stepComponent, idx) in steps" :key="idx">
              <Component
                :is="stepComponent"
                v-if="idx === step"
                @step-config="(e: any) => setStepConfig(e)"
              />
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
    <CustomBottomNavActions @return="executeBack" @forward="executeSubmit" />
  </v-col>
</template>

<style scoped>
.full-height {
  height: calc(100dvh - 124px);
}
</style>
