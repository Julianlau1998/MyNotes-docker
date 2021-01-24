<template>
    <div>
        <h1 class="header">My<span style="color:rgb(215, 0, 0);">N</span>otes</h1>
        <hr class="whiteLine">
        <div class="form"> <br><br>
            <input type="email" placeholder="Email" v-model="email"> <br><br>
            <input type="password" placeholder="Password" v-model="password"><br><br>
            <button type="button" v-on:click="logIn" id="login">Log In</button>
        </div>
        <GoogleLogin id="googleLogin" :params="params" :onSuccess="onSuccess" :onFailure="onFailure"><img id="googleImage" src="../assets/google.png" alt=""></GoogleLogin>
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
    #googleLogin {
        display: flex;
        justify-content: center;
        margin: 0 auto;
        align-items: center;
        margin-top: 3rem;
        width: 12rem;
        height: 2.6rem;
        border: none;
    } 
    #login {
        width: 6rem;
        height: 3rem;
        border-radius: 1rem;
        background-color: transparent;
        border: none;
        box-shadow: -1px -1px 4px 0px rgb(133, 133, 133),
                    1px 1px 5px 2px black;
        color: lightgray;
        font-weight: 960;
        font-size: larger;
        margin-top: 1rem;
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
    input {
        border-radius: 5px;
        height: 2.5rem;
         background-color: transparent;
        border: none;
        box-shadow: -1px -1px 4px 0px rgb(133, 133, 133),
                    1px 1px 20px 2px rgb(0, 0, 0);
        color: lightgray;
        font-weight: 400;
        font-size: larger;
        padding-left: 1rem;
        padding-right: -1rem;
    }
    @media (min-width: 1000px) { 
    }
</style>