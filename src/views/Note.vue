<template>
    <div id="app">
        <div>
            <router-link to="/">
                    <img src="../assets/arrow.png" alt="back arrow" class="arrow">
            </router-link>
        </div>
        <div>
            <router-link to="/">
                    <img src="../assets/trash.png" alt="delete icon" class="delete">
            </router-link>
        </div>
        <br><br>
        <form>
            <div class="form-group">
                <input type="test" class="form-control" id="title" placeholder="Title" value="title" v-model="title">        
            </div>
            <div class="form-group">
                <textarea type="test" class="form-control" id="note"  placeholder="Note" value="note" v-model="note"> </textarea>        
            </div>
        </form>
        <button class="saveButton" @click="save">Save</button>
    </div>
</template>

<script>
import router from '../router'
export default {
    data () {
        return {
            id: this.$store.state.id,
            notes: JSON.parse(localStorage.getItem('notes')),
            title: '',
            note: '',
            currentObject: {title: '', note: '', id: ""},
        }
    },
    methods: {
        save () {
            for (let i = 0; i < this.notes.length; i++) {
                if (this.notes[i].id === this.id) {
                    this.notes[i].title = this.title
                    this.notes[i].note = this.note                }
            }
            localStorage.setItem('notes', JSON.stringify(this.notes))
            router.push('/')
        }
    },
    mounted () {
        for (let i = 0; i < this.notes.length; i++) {
            if (this.notes[i].id === this.id) {
                this.title = this.notes[i].title
                this.note = this.notes[i].note
            }
        }
    }
}
</script>