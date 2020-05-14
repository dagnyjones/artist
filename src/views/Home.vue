<template>
  <v-carousel
  id="slider"
    cycle
    height="690"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
    id="slider"
      v-for="(slide, i) in slides"
      :key="i"
    >
      <v-sheet
      id="slider"
        :color="colors[i]"
        height="100%"
      >
        <v-row
        id="slider"
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="display-3">
              <span>{{ slide }}</span><br>
              
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    data () {
      return {
        colors: [
          'pink lighten-2',
          'blue lighten-3',
          'light-green accent-3',
          'yellow ',
          'deep-orange ',
        ],
        slides: [
          'WELCOME TO POSTERS BY DAGNY',
          'SHOP FOR AMAZING ART PRINTS',
          'POSTERS FOR EVERY SINGLE ROOM OR BATHROOM',
          'AMAZING PRICES',
          '100% SERVICE 24/7',
        ],
      }
    },
  }
</script>

<style lang="scss">

#slider {
  background-size: cover;
}

.class {
  display: flex;
  justify-content: center;
}
</style>