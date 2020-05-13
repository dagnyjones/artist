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
import firebase from 'firebase'
import 'firebase/firestore'

    export default {
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {

            signIn() {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
                    this.$router.replace('/admin')
                })
                .catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        alert ("Wrong Password")
                    } else {
                        alert (errorMessage)
                    }
                    console.log(error)
                })

                
            },
            signOut() {
                firebase.auth().signOut().then(() => {
                    alert('LOGGED OUT');
                    this.$router.replace('/')
                }).catch(error => {
                    alert(error)
                })

            }
        },
        
    }
</script>

<style lang="scss" scoped>

#info {
    padding: 20px;
}

</style>