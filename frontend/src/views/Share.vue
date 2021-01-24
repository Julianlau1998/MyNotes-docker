<template>
    <div>
        <h1 class="header">MyNotes</h1>
        <hr class="whiteLine">
        <div class="centered">
            <h1 class="white">Notiz senden an :</h1> <br>
            <input type="email" placeholder="Enter Email" v-model="email"><br>
            <span class="errorMessage" v-if="exists === false"> User doesn't exist!</span><br>
            <button v-on:click="send">Send</button>
            <button class="homeButton" v-on:click="home"> Home </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data () {
        return {
            users: [],
            email: '',
            success: false,
            exists: true
        }
    },
    mounted () {
        if (this.$store.state.title === '') {
            this.$router.push('/')
        }
        axios.get(`http://${this.$store.state.localhost}/users`).then((response) => {
            for (let i=0; i<response.data.length; i++) {
                this.users.push(response.data[i])
            } 
        })
    },
    methods:{
        send () {
           for (let i=0; i<this.users.length; i++) {
                if (this.users[i].email == this.email) {
                    axios.post(`http://${this.$store.state.localhost}/notes`, {
                        title: '(Shared)' + this.$store.state.title,
                        note: this.$store.state.note,
                        userId: this.users[i].id
                    })
                    .then(response => {response.data})
                    .catch(e => {
                        this.errors.push(e)
                    })
                    this.success = true
                } 
            }
            if (this.success === true) {
                this.$router.push('/')
            } else {
                this.exists = false
            }
        },
        home () {
            this.$router.push('/')
        }
    } 
}
</script>

<style scoped>
    
    #userButton {
        background-color: black;
    }
    ul li {
        list-style: none;
      list-style-type: none;
    }

</style>