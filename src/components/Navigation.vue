




<template>

    <div>

        <v-navigation-drawer color="dark" v-model="drawer" app>

          <div>

          </div>

      


            <div v-if="currentUser" >

                <v-card
                class="mx-auto"
                tile
                color="dark"
            >
                
      <v-row
        align="end"
        class="fill-height"
        
      >
        <v-col
          align-self="start"
          class="pa-0"
          cols="12"
        >
          
        </v-col>
        <v-col v>
          <v-list-item dark>
            <v-list-item-content>
              <v-list-item-title class="title" >{{ currentUser.email }}</v-list-item-title>

            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
  </v-card>
</div>


            <ul>
                <router-link tag="li" to="/">
                 HOME
                </router-link>

                <router-link tag="li" to="/product">
                 PRODUCTS
                </router-link>

                <router-link tag="li" to="/cart">
                 CART
                </router-link>

                <router-link tag="li" to="/about">
                 ABOUT
                </router-link>

                <router-link tag="li" to="/login">
                 LOGIN
                </router-link>

                

                <router-link tag="li" v-if="currentUser" to="/orders">
                 ORDERS
                </router-link>

                <router-link tag="li" to="/admin">
                 ADMIN
                </router-link>

                <!-- <router-link tag="li" to="/login">
                <v-icon color="white">info</v-icon> LOGIN
                </router-link> -->

                <!-- <router-link tag="li" to="/admin">
                <v-icon color="white">lock</v-icon> ADMIN
                </router-link> -->
            </ul>
        </v-navigation-drawer>

        <v-app-bar app color="dark" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title class="headline">
                <span class="font-weight-bold">POSTERS BY </span>
                <span class="font-weight-light">DAGNY JONS</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>

    <div id="nav-buttons">

      <v-btn elevation="0" color="dark">
        <router-link tag="li" to="/login">
          <v-icon>account_box</v-icon>
        </router-link>
        
      </v-btn>

      <v-btn elevation="0" color="dark">
        <router-link tag="li" to="/cart">
          <v-icon>shopping_cart</v-icon>
        </router-link>  
      </v-btn>

  </div>

      <v-menu
        left
        bottom
      >
        

        
      </v-menu>

        </v-app-bar>

    </div>
</template>

<script>
import { db } from '../../firebase'

import firebase from 'firebase'
import 'firebase/firestore'
import store from '../store/index.js'

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
       store.dispatch('setUser', user)
    } else {
        store.dispatch('setUser', null)
    }
});


    export default {
        data: () => ({
      drawer: null,
    }),
    computed: {
        currentUser() {
            return this.$store.getters.currentUser
        }
    }
        
    }
</script>

<style lang="scss" scoped>


nav ul {
    padding: 0;
    margin-top: 20px;
    text-decoration: none;
}

nav li {
    color:map-get($colorz, white);
    margin-left: 15%;
    padding: 5px 20px;
    list-style-type: none;
    cursor: pointer;
}

/* nav li i {
    margin-right: 10px;
} */

nav li:last-child {
    position: absolute;
    bottom: 40px;
    color: map-get($colorz, white);
}

#nav-buttons {

  text-decoration: none;
  list-style-type: none;  

}


</style>