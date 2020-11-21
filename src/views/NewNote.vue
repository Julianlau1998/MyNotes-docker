<template>
    <div id="app">
        <router-link to="/">
            <img src="../assets/arrow.png" alt="back arrow" class="arrow">
        </router-link>
        <br><br>
        <form>
            <div class="form-group">
                <input type="test" class="form-control" id="title"  placeholder="Title" v-model="title">        
            </div>
            <div class="form-group">
                <textarea type="test" class="form-control" id="note"  placeholder="Note" v-model="note"> </textarea>        
            </div>
        </form>
        <button class="saveButton" @click="save">Save</button>
    </div>
</template>

<script>
export default {
    data () {
        return {
            title: '',
            note: '',
            currentObject: {title: '', note: '', id: ""},
            notesList: JSON.parse(localStorage.getItem('notes')),
            id: localStorage.getItem('id') 
        }
    },
    methods: {
        save () {
            if(this.notesList===null) {
                this.notesList = []
            }
            this.currentObject.title = this.title
            this.currentObject.note = this.note
            this.id++
            this.currentObject.id = this.id
            this.notesList.push(this.currentObject)
            localStorage.setItem('id', this.id)
            localStorage.setItem('notes',JSON.stringify(this.notesList))
            this.$router.push('/')
        }
    },
    mounted () {
        if (this.id === null) {
            this.id = 0
        }
    }
}
</script>

<style scoped>
</style>