<script setup lang="ts">
const props = defineProps({
  tooltipProps: {
    type: Object,
    default: () => ({}),
  },
  btnProps: {
    type: Object,
    default: () => ({}),
  },
});

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
  <v-tooltip v-bind="bindTooltip">
    <template #activator="{ props: propsActivator }">
      <v-btn
        v-bind="{ ...propsActivator, ...bindBtn }"
        @click="emits('dispatch-action')"
      />
    </template>
  </v-tooltip>
</template>
