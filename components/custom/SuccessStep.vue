<script lang="ts" setup>
type IStepConfig = {
  submit: () => Promise<void>;
  back: () => boolean;
};

const emit = defineEmits<{
  (e: "step-config", config: IStepConfig): void;
}>();

const router = useRouter();

onBeforeMount(() => {
  emit("step-config", {
    submit: async () => {
      await router.push({ path: "/" });
    },
    back: () => true,
  });
});
</script>

<template>
  <v-col>
    <v-row no-gutters justify="center">
      <v-icon icon="mdi-check-circle-outline" size="200" color="primary" />
    </v-row>

    <p class="text-center my-6">As informações foram salvas com sucesso!</p>
  </v-col>
</template>
