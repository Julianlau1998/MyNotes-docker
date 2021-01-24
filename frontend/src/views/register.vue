<template>
    <div>
        <h1 class="header">MyNotes</h1>
        <hr class="whiteLine">
         <ValidationObserver v-slot="{ invalid }">
            <form class="form" @submit.prevent="onSubmit"><br><br>

                <ValidationProvider name="E-mail" rules="required" v-slot="{ errors }">
                    <input v-model="email" type="email" placeholder="email"><br>
                    <span class="errorMessage">{{ errors[0] }}</span>
                </ValidationProvider><br>

                <ValidationProvider name="Password" rules="required" v-slot="{ errors }">
                    <input v-model="password" type="password" placeholder="password"><br>
                    <span class="errorMessage">{{ errors[0] }}</span>
                </ValidationProvider><br>

                <ValidationProvider name="First Name" rules="required" v-slot="{ errors }">
                    <input v-model="firstName" type="text" placeholder="First Name"><br>
                    <span class="errorMessage">{{ errors[0] }}</span>
                </ValidationProvider><br>

                <ValidationProvider name="Last Name" rules="required" v-slot="{ errors }">
                    <input v-model="lastName" type="text" placeholder="Last Name"><br>
                    <span class="errorMessage">{{ errors[0] }}</span>
                </ValidationProvider><br><br>

                

                <button type="submit" :disabled="invalid">Register</button>
            </form>
        </ValidationObserver>
        <GoogleLogin id="login" :params="params" :onSuccess="onSuccess" :onFailure="onFailure"><img id="googleImage" src="../assets/google.png" alt=""></GoogleLogin>

        <router-link to="/logIn" id="register">Log In<br>instead</router-link>
        

    </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';
import axios from 'axios'
import {uuid} from "vue-uuid";
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'This field is required'
});


export default {
    data () {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            id: uuid.v4(),
            params: {
                client_id: "672669366725-vqgmoki2e0itco3gt51d48b7dpvt5m59.apps.googleusercontent.com"
            }
        }
    },
    components: {
        GoogleLogin,
        ValidationProvider,
        ValidationObserver
    },
    methods: {
        onSuccess(googleUser) {
            this.$router.push('/') 
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
        },
        onFailure () {
            alert("failure")
        },
        onSubmit () {
            var user = {
                id: this.id,
                email: this.email,
                firstName: this.firstName,
                lastName: this.lastName
            }
            sessionStorage.setItem('user',JSON.stringify(user)); 

             axios.post(`http://${this.$store.state.localhost}/users`, {
                id: this.id,
                email: this.email,
                password: this.password,
                firstName: this.firstName,
                lastName: this.lastName
            })
            .then(response => {response.data})
            .catch(e => {
                this.errors.push(e)
            })
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
    .invisible {
        opacity: 0;
    }
    .form {
        display: block;
        text-align: center;
    }
    #register {
        width: 6rem;
    }
</style>