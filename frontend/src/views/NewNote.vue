<template>
    <div id="app">
        <router-link to="/">
            <img src="../assets/arrow.png" alt="back arrow" class="arrow">
        </router-link>
        <br><br>
        <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)">
            <div class="form-group">
                <ValidationProvider name="email" rules="required" v-slot="{ errors }">
                    <input type="test" class="form-control" id="title"  placeholder="Title" v-model="title">        
                    <span class="errorMessage">{{ errors[0] }}</span>
                </ValidationProvider>
            </div>
            <div class="form-group">
                <textarea type="test" class="form-control" id="note"  placeholder="Note" v-model="note"> </textarea>        
            </div>
            <button type="submit" class="saveButton">Save</button>
        </form>
        </ValidationObserver>
    </div>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import axios from 'axios'
import store from '../store'

extend('required', {
  ...required,
  message: 'This field is required'
});

export default {
    components: {
        ValidationProvider,
        ValidationObserver
    },
    data () {
        return {
            title: '',
            note: '',
            currentObject: {title: '', note: '', id: ""},
            notesList: {},
            userId: JSON.parse(sessionStorage.getItem('user')).id
        }
    },
    methods: {
        onSubmit () {
            if(this.notesList===null) {
                this.notesList = []
            }
            this.currentObject.title = this.title
            this.currentObject.note = this.note
            this.currentObject.id = this.id
            // localStorage.setItem('id', this.id)
            axios.post(`${store.state.localhost}/notes`, {
                title: this.currentObject.title,
                note: this.currentObject.note,
                userId: this.userId
            })
            .then(response => {response.data})
            .catch(e => {
                this.errors.push(e)
            })
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