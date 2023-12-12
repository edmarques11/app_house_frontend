<script setup lang="ts">
const props = defineProps({
  appBarProps: {
    type: Object,
    default: () => ({}),
  },
});

const router = useRouter();

const bindAppBar = computed(() => ({
  class: "appbar-default-layout",
  elevation: "2",
  ...props.appBarProps,
}));

const pushTo = (path: string) => {
  router.push({ path });
};
</script>

<template>
  <v-app-bar v-bind="bindAppBar"
    ><template #append>
      <v-btn
        icon="mdi-heart"
        @click="pushTo({ path: '/advertisement/create' })" /></template
  ></v-app-bar>
</template>

<style>
.appbar-default-layout {
  background-color: red !important;
}
</style>
