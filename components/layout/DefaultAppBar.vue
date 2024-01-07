<script setup lang="ts">
import { useTheme } from "vuetify";
const props = defineProps({
  appBarProps: {
    type: Object,
    default: () => ({}),
  },
});

const router = useRouter();
const route = useRoute();
const theme = useTheme();

const bindAppBar = computed(() => ({
  elevation: "2",
  ...props.appBarProps,
}));
const activeAction = computed(() => {
  type T = {
    [key: string]: number;
  };
  const mapActive: T = {
    "advertisement-create": 0,
  };

  return route.name ? mapActive[route.name.toString()] : -1;
});
const activeColor = computed(() => theme.current.value.colors.primary);

const pushTo = (path: string) => {
  router.push({ path });
};
</script>

<template>
  <v-app-bar v-bind="bindAppBar">
    <v-app-bar-title>
      <v-row no-gutters class="pa-0 ma-0" justify="center">
        <v-col cols="6" class="pa-0 ma-0">
          <CustomSearchAdvertisements
            :text-field-props="{ hideDetails: true, density: 'compact' }"
          />
        </v-col>
      </v-row>
    </v-app-bar-title>
    <template #append>
      <CustomButtonTooltip
        v-bind="{
          tooltipProps: { text: 'Criar novo anúncio' },
          btnProps: {
            icon: 'mdi-home-plus',
            class: [{ 'btn-active-color': activeAction === 0 }],
          },
        }"
        @dispatch-action="pushTo('/advertisement/create')"
      />
      <AuthActionAuth />
    </template>
  </v-app-bar>
</template>

<style>
.btn-active-color {
  color: v-bind(activeColor);
}
</style>
