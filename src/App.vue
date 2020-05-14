<template>
  <v-app id="app">
    <toolbar />
    <navigation />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

import Navigation from './components/Navigation.vue'
import Toolbar from './components/Toolbar.vue'

  export default {
    components: {
      Toolbar,
      Navigation
      
    },
    name: 'App',
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
  }
</script>

<style lang="scss">

main {
  background-color: white;
  //background-image: url('');
  //background-size: cover;
}

#info {
  background-color: white;
}

  
</style>