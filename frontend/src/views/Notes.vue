<template>
    <div id="app">
        <img src="../../public/img/settings.png" alt="settings" v-on:click="settings" id=settingsImage>
        <h1 class="header">My<span style="color:rgb(215, 0, 0);">N</span>otes</h1>
        <hr class="whiteLine">
        <!--<h2><span style="color: green">Notes</span>
        <router-link to="/Lists" style="color: white; margin-left: 0.6rem;">Lists</router-link></h2>-->
        <br>
        <!--<hr class="line">-->
        <ul id="listParent">
            <li v-for="(note, idx) in storedNotes" v-bind:key="idx">
                <button class="noteDiv" @click="openNote(note.id)">
                    <h5><b>{{note.title.substring(0, 12)}}</b></h5>
                </button>
                <hr id="whiteLine">
            </li>
        </ul>

        <router-link to="/NewNote"><div class="plusButton">+</div></router-link>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import store from '../store'


export default {
    name: 'Notes',
    data () {
        return {
            storedNotes: [],
            titles: [],
            notes: [],
            allNotes: []
        }
    },
    methods: {
        openNote (id) {
            this.$store.state.id = id
            router.push(`/Note/${id}`)
        },
        settings () {
            this.$router.push('/settings')
        }
    },
    created () {
        var user = JSON.parse(sessionStorage.getItem('user'))
        if (user !== null) {
            axios.get(`${store.state.localhost}/notes`).then((response) => {
                this.allNotes = response.data
                for (let i=0; i<this.allNotes.length; i++) {
                    if (this.allNotes[i] != null) {
                        if (this.allNotes[i].userId == user.id) {
                            this.storedNotes.push(this.allNotes[i])
                        }
                    }
                }
            })
        } else {
            this.$router.push('/login')
        } 
    }
}
</script>

<style scoped>
body {
    margin: 0;
}
ul {
    list-style-type: none;
}
ul li {
    display: inline-block;
}
.noteDiv {
    overflow-wrap: break-word; 
    width: 9rem;
    height: 8rem;
    border-radius: 1rem;
    background-color: transparent;
    border: none;
    box-shadow: -1px -1px 4px 0px rgb(133, 133, 133),
                1px 1px 5px 2px black;
    margin: 1rem 2rem 2.5rem;
    margin-left: 0rem;
    color: lightgray;
}
#whiteLine{
    border-top: 3px solid rgb(215, 0, 0);
    margin-top: -0.5rem;
    margin-bottom: 1rem;
    margin-left: -2.5rem;
}
#logOut {
    position: fixed;
    top: 1rem; 
    right: 1rem;
}
#settingsImage {
    width: 2.2rem;
    position: absolute;
    right: 0.7rem;
    top: 0.7rem;
    cursor: pointer;
}
@media (max-width: 390px) { 
    .noteDiv {
        width: 7rem;
        height: 7rem;
    }
 }
@media (max-width: 327px) { 
    .noteDiv {
        width: 6rem;
        height: 6rem;
    }
    body {
        margin: 100rem;
    }
 }

@media (min-width: 1000px) { 
    .noteDiv {
        width: 11rem;
        height: 9rem;
    }
 }
</style>