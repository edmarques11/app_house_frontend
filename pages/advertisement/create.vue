<script setup lang="ts">
import {
  AddressSaveAddress,
  ImmobileSaveImmobile,
  AdvertisementSaveAdvertisement,
  CustomSuccessStep,
} from "#components";
const step = ref(0);
const steps = [
  AddressSaveAddress,
  ImmobileSaveImmobile,
  AdvertisementSaveAdvertisement,
  CustomSuccessStep,
];

type IStepConfig = {
  submit: () => Promise<void>;
  back: () => boolean;
};
const stepConfig = ref<IStepConfig>({
  submit: () => Promise.resolve(),
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
  <v-row no-gutters justify="center" class="full-height">
    <v-col cols="12" md="5" xl="3" align-self="center">
      <v-card elevation="2" class="ma-3 pa-3">
        <v-window v-model="step">
          <v-window-item v-for="(stepComponent, idx) in steps" :key="idx">
            <v-row no-gutters>
              <v-btn @click="step++">+step</v-btn>
            </v-row>
            <Component
              :is="stepComponent"
              v-if="idx === step"
              @step-config="(e: any) => setStepConfig(e)"
            />
          </v-window-item>
        </v-window>
      </v-card>
    </v-col>
    <CustomBottomNavActions @return="executeBack" @forward="executeSubmit" />
  </v-row>
</template>

<style scoped>
.full-height {
  min-height: calc(100vh - 124px);
  max-height: fit-content;
  padding-bottom: 60px !important;
}
</style>
