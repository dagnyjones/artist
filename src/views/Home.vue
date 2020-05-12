<template>
  <v-container grid-list-xs>
    <!-- first box -->
    <v-layout align-center class="info_box">
      <v-flex sm3 xs12 offset-sm6>
        <div>
          <h1>
            SHOP
          </h1>
        </div>
        <div>
          <p>
            lalaala
          </p>
        </div>
      </v-flex>
    </v-layout>
    <!-- second box -->
    <v-layout align-center class="info_box" row-wrap>
      <v-flex sm6 xs12 offset-sm6> 
        <div>
          <h1>
            SHOP
          </h1>
        </div>
        <div>
          <p>
            lalaala
          </p>
        </div>
      </v-flex>
    </v-layout>      
  </v-container>
</template>

<script>
// @ is an alias to /src
 // import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  }
}
</script>

<style lang="scss">

.info_box .flex h1 {
    /* @include infobox_mixin(5px, map-get($colorz, white), 10px, 5px, map-get($colorz, white));
    font-weight: bold;
    text-transform: uppercase;
    font-size: 16px;
    text-align: center */

}

.info_box .flex div {
 padding: 20px;  
}

.layout:first-child {
  height: 40vh;
}

.layout:last-child {
  height: 40vh;
}
  
</style>