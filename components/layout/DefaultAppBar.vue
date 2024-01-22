<script setup lang="ts">
import { useTheme } from "vuetify";

const props = withDefaults(
  defineProps<{
    appBarProps?: Record<string, unknown>;
  }>(),
  {
    appBarProps: () => ({}),
  },
);

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
    index: 0,
    "advertisement-create": 1,
    "advertisement-list": 2,
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
          tooltipProps: { text: 'Ver anúncios disponíveis' },
          btnProps: {
            icon: 'mdi-list-box',
            class: [{ 'btn-active-color': activeAction === 0 }],
          },
        }"
        @dispatch-action="pushTo('/')"
      />
      <CustomButtonTooltip
        v-bind="{
          tooltipProps: { text: 'Criar novo anúncio' },
          btnProps: {
            icon: 'mdi-home-plus',
            class: [{ 'btn-active-color': activeAction === 1 }],
          },
        }"
        @dispatch-action="pushTo('/advertisement/create')"
      />
      <CustomButtonTooltip
        v-bind="{
          tooltipProps: { text: 'Seus anúncios' },
          btnProps: {
            icon: 'mdi-folder-home',
            class: [{ 'btn-active-color': activeAction === 2 }],
          },
        }"
        @dispatch-action="pushTo('/advertisement/list')"
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
