<script lang="ts" setup>
const images: string[] = [
  "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
  "https://cdn.vuetifyjs.com/images/cards/hotel.jpg",
];

const formatPrice = (price: number) =>
  price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
</script>

<template>
  <v-row no-gutters justify="center">
    <v-col cols="12" sm="6" md="4">
      <v-card>
        <v-col>
          <v-carousel
            height="250"
            :show-arrows="false"
            hide-delimiter-background
            delimiter-icon="mdi-square"
            touch
          >
            <v-carousel-item
              v-for="(img, idx) in images"
              :key="idx"
              :src="img"
            />
          </v-carousel>

          <p class="text-primary font-weight-bold text-end mt-4">
            {{ formatPrice(250) }}
          </p>
          <p class="mb-4">Casa do prego</p>
          <p><v-icon icon="mdi-home-city" class="mr-2" />Mansão</p>
          <p><v-icon icon="mdi-resize" class="mr-2" />180 x 24</p>
        </v-col>
      </v-card>
    </v-col>
  </v-row>
</template>
