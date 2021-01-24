<template>
    <div>
        <h1 class="header">My<span style="color:rgb(215, 0, 0);">N</span>otes</h1>
        <hr class="whiteLine">
        <div class="centered">
            <h1 class="white">Notiz senden an :</h1> <br>
            <input type="email" placeholder="Enter Email" v-model="email"><br>
            <span class="errorMessage" v-if="exists === false"> User doesn't exist!</span><br><br>
            <button v-on:click="send" class="send">Send</button>
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
    .send {
        width: 6rem;
        height: 2.5rem;
        border-radius: 0.7rem;
        background-color: transparent;
        border: none;
        box-shadow: -1px -1px 4px 0px rgb(133, 133, 133),
                    1px 1px 5px 2px black;
        color: lightgray;
        font-weight: 600;
        font-size: large;
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

</style>