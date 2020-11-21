<template>
    <div id="app">
        <h1 class="header">MyNotes</h1>
        <hr class="whiteLine">
        <h2><span style="color: green">Notes</span> Lists</h2>
        <br>
        <!--<hr class="line">-->
        <ul id="listParent">
            <li v-for="(note, idx) in storedNotes" v-bind:key="idx">
                <hr id="whiteLine">
                <button class="noteDiv" @click="openNote(note.id)">
                    <h5><b>{{note.title}}</b></h5>
                </button>
            </li>
        </ul>

        <router-link to="/NewNote"><div class="plusButton">+</div></router-link>
    </div>
</template>

<script>
import router from '../router'

export default {
    name: 'Notes',
    data () {
        return {
            storedNotes: JSON.parse(localStorage.getItem('notes')),
            titles: [],
            notes: []
        }
    },
    methods: {
        openNote (id) {
            this.$store.state.id = id
            router.push('/Note')
        }
    },
    mounted () {
        if(this.storedNotes === null) {
            this.storedNotes = []
        } else {
            for (let i=0; i<this.storedNotes.length; i++) {
            this.titles.push(this.storedNotes[i].title)
            this.notes.push(this.storedNotes[i].note)
            console.log(this.titles[i])
        }
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
    float: left;
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
.header {
    font-size: 3.5rem;
    color: lightgray;
}
.whiteLine{
    border-top: 3px solid rgb(134, 134, 134);
    width: 12.5rem;
    margin-top: -0.5rem;
    margin-bottom: 1rem;
}
#whiteLine{
    border-top: 3px solid rgb(134, 134, 134);
    margin-top: -0.5rem;
    margin-bottom: 1rem;
    margin-left: -1.8rem;
}
</style>