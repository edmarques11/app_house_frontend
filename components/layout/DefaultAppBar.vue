<script setup lang="ts">
const props = defineProps({
  appBarProps: {
    type: Object,
    default: () => ({}),
  },
});

const router = useRouter();

const bindAppBar = computed(() => ({
  elevation: "2",
  ...props.appBarProps,
}));

const pushTo = (path: string) => {
  router.push({ path });
};
</script>

<template>
  <v-app-bar v-bind="bindAppBar">
    <template #append>
      <CustomButtonTooltip
        v-bind="{
          tooltipProps: { text: 'Criar novo anúncio' },
          btnProps: { icon: 'mdi-home-plus' },
        }"
        @dispatch-action="pushTo('/advertisement/create')"
      />
      <AuthActionAuth />
    </template>
  </v-app-bar>
</template>
