<template>
    <div>

        <v-navigation-drawer color="dark" v-model="drawer" app>
            <ul>
                <router-link tag="li" to="/">
                 HOME
                </router-link>

                <router-link tag="li" to="/product">
                 PRODUCTS
                </router-link>

                <router-link tag="li" to="/about">
                 ABOUT
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

        </v-app-bar>

    </div>
</template>

<script>
    export default {
        data: () => ({
      drawer: null,
    }),
        
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

</style>