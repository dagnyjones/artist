<template>
   <v-container>
    <v-row>
        <v-col offset-md="3" md="6" xs="12">
            <h1>
                ADMIN LOGIN
            </h1>

            <div id="loginbox">
                <v-text-field
                v-model="email"
                label="EMAIL"
                required>
                </v-text-field>

                <v-text-field
                v-model="password"
                label="PASSWORD"
                required>
                </v-text-field>

                <v-btn color="complete"
                @click.prevent="signIn()">
                    LOGIN
                </v-btn>

                <v-btn color="incomplete"
                @click.prevent="signOut()">
                   SIGN OUT
                </v-btn>


            </div>

        </v-col>
    </v-row>
</v-container>
</template>

<script>
    export default {
        data() {
            return {
                email: '',
                password: ''
            }
        },
        
        
    }
</script>

<style lang="scss" scoped>

#info {
    padding: 20px;
}

</style>