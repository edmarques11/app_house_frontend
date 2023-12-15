<script setup lang="ts">
const props = defineProps({
  showArrow: {
    type: Boolean,
    default: true,
  },
  propsBtnAdvance: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["forward", "return"]);

const bindAdvanceBtn = computed(() => ({
  color: "primary",
  elevation: "0",
  ...props.propsBtnAdvance,
}));
</script>

<template>
  <v-row no-gutters class="custom-bottom-nav-actions py-3">
    <v-btn
      v-if="props.showArrow"
      elevation="0"
      class="ml-3"
      color="transparent"
      @click="emit('return')"
      ><span>{{ "<" }}</span></v-btn
    >
    <v-btn v-bind="bindAdvanceBtn" class="btn-advance" @click="emit('forward')"
      >avançar</v-btn
    >
  </v-row>
</template>

<style lang="scss">
.custom-bottom-nav-actions {
  width: 100dvw;
  position: fixed;
  bottom: 0;
  background-color: #f2f2f2;

  .btn-advance {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
