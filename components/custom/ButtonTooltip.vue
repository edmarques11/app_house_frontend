<script setup lang="ts">
import { VTooltip, VBtn } from "vuetify/components";

const props = withDefaults(
  defineProps<{
    tooltipProps?: Partial<VTooltip>;
    btnProps?: Partial<VBtn>;
  }>(),
  {
    tooltipProps: () => ({}),
    btnProps: () => ({}),
  },
);

const emits = defineEmits(["dispatch-action"]);

const bindTooltip = computed(() => ({
  text: "Action",
  ...props.tooltipProps,
}));
const bindBtn = computed(() => ({
  icon: "mdi-heart",
  ...props.btnProps,
}));
</script>

<template>
  <client-only>
    <v-tooltip v-bind="bindTooltip">
      <template #activator="{ props: propsActivator }">
        <slot name="default" v-bind="{ bind: { propsActivator } }">
          <v-btn
            v-bind="{ ...propsActivator, ...bindBtn }"
            @click="emits('dispatch-action')"
          />
        </slot>
      </template>
    </v-tooltip>
  </client-only>
</template>
