<template>
    <div>
        <h1 class="header">MyNotes</h1>
        <hr class="whiteLine">
        <div class="form"> <br><br>
            <input type="email" placeholder="Email" v-model="email"> <br>
            <input type="password" placeholder="Password" v-model="password"><br><br>
            <button type="button" v-on:click="logIn">Log In</button>
        </div>
        <GoogleLogin id="login" :params="params" :onSuccess="onSuccess" :onFailure="onFailure"><img id="googleImage" src="../assets/google.png" alt=""></GoogleLogin>
        <!--<GoogleLogin :params="params" :logoutButton=true>Logout</GoogleLogin>-->

        <router-link to="/register" id="register">Or Register new Account</router-link>
        

    </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';
import axios from 'axios'

export default {
        name: 'App',
        data() {
            return {
                // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
                params: {
                    client_id: "672669366725-vqgmoki2e0itco3gt51d48b7dpvt5m59.apps.googleusercontent.com"
                },
                // only needed if you want to render the button with the google ui
                renderParams: {
                    width: 250,
                    height: 50,
                    longtitle: true
                },
                email: '',
                password: '',
                users: [],
                correct: false
            }
        },
        components: {
            GoogleLogin
        },
        methods: {
        onSuccess(googleUser) {
            var user = {
                id: googleUser.getBasicProfile().JR,
                email: googleUser.getBasicProfile().jt,
                firstName: googleUser.getBasicProfile().nT,
                lastName: googleUser.getBasicProfile().pR
            }
            sessionStorage.setItem('user',JSON.stringify(user)); 
            
            axios.post(`http://${this.$store.state.localhost}/users`, {
                id: googleUser.getBasicProfile().JR,
                email: googleUser.getBasicProfile().jt,
                firstName: googleUser.getBasicProfile().nT,
                lastName: googleUser.getBasicProfile().pR
            })
            .then(response => {response.data})
            .catch(e => {
                this.errors.push(e)
            })
            this.$router.push('/') 
        },
        onFailure () {
            alert("failure")
        },
        logIn () {
            axios.get(`http://${this.$store.state.localhost}/users`)
            .then((response) => {
                this.users = response.data
                for (let i=0; i<this.users.length; i++) {
                    if (this.users[i].email == this.email) {
                        if (this.users[i].password == this.password) {
                            sessionStorage.setItem('user',JSON.stringify(this.users[i]))
                            this.$router.push('/') 
                            this.correct = true
                        }
                    }
                }
                if (this.correct === false) {
                    alert("Wrong Password or Email")
                }
            })
        } 
    }
    }
</script>

<style scoped>
    #login {
        display: flex;
        justify-content: center;
        margin: 0 auto;
        align-items: center;
        margin-top: 3rem;
        width: 12rem;
        height: 2.6rem;
        border: none;
    } 
    #googleImage {
        width: 12.3rem;
    }
    .invisible {
        opacity: 0;
        height: 2rem;
    }
    .form {
        display: block;
        text-align: center;

    }
    @media (min-width: 1000px) { 
    }
</style>