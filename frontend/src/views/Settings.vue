<template>
    <div id="app">
        <h1 class="header">My<span style="color:rgb(215, 0, 0);">N</span>otes</h1>
        <hr class="whiteLine">
        <GoogleLogin :params="params" :logoutButton=true id="logOut" :onSuccess="onSuccess" 
        :onFailure="onFailure">
            Logout
        </GoogleLogin>
    </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';

export default {
    name: 'Notes',
    data () {
        return {
            params: {
                client_id: "672669366725-vqgmoki2e0itco3gt51d48b7dpvt5m59.apps.googleusercontent.com"
            },
        }
    },
    components: {
            GoogleLogin
    },
    methods: {
        onSuccess() {
            sessionStorage.clear()
            this.$router.push('/login') 
        },
        onFailure () {
            sessionStorage.clear()
            this.$router.push('/login') 
        },
    }
}
</script>
<style scoped>
    #logOut {
        overflow-wrap: break-word; 
        width: 9rem;
        height: 4rem;
        border-radius: 1rem;
        background-color: transparent;
        border: none;
        box-shadow: -1px -1px 4px 0px rgb(133, 133, 133),
                    1px 1px 5px 2px black;
        color: lightgray;
        font-weight: 900;
        font-size: larger;
        margin-top: 5rem;
    }
</style>