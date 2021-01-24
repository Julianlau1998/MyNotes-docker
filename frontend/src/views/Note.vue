<template>
    <div id="app">
        <div>
            <router-link to="/">
                    <img src="../assets/arrow.png" alt="back arrow" class="arrow">
            </router-link>
        </div>
        <div>
            <router-link to="/">
                    <img src="../assets/trash.png" alt="delete icon" class="delete" @click="deleteNote">
            </router-link>
        </div>
        <br><br>
        <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)">
            <div class="form-group">
                <ValidationProvider name="email" rules="required" v-slot="{ errors }">
                    <input type="test" class="form-control" id="title" placeholder="Title" value="title" v-model="title" ref="title" autofocus>        
                <span class="errorMessage">{{ errors[0] }}</span>
                </ValidationProvider>
            </div>
            <div class="form-group">
                <textarea type="test" class="form-control" id="note"  placeholder="Note" value="note" v-model="note"> </textarea>        
            </div>
            <button class="saveButton" type="submit">Save</button>
        </form>
        </ValidationObserver>
        <button class="shareButton" v-on:click="share">Share</button>
    </div>
</template>

<script>
import router from '../router'
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
            id: this.$route.params.id,
            notes: {},
            title: '',
            note: '',
            currentObject: {title: '', note: '', id: ""},
        }
    },
    methods: {
        onSubmit () {
            if (this.notes !== null) {
                for (let i = 0; i < this.notes.length; i++) {
                    if(this.notes[i] != null) {
                        if (this.notes[i].id === this.id) {
                            this.notes[i].title = this.title
                            this.notes[i].note = this.note  
                        }
                    }
                }
            }
            axios.put(`http://${this.$store.state.localhost}/notes/${this.id}`, {
                title: this.title,
                note: this.note,
                id: this.id
            })
            router.push('/')
        },
        deleteNote () {
            axios.delete(`http://${this.$store.state.localhost}/notes/${this.id}`, {
            })
        },
        share () {
            this.$store.state.note = this.note
            this.$store.state.title = this.title
            this.$router.push('/share')
        }
    },
    mounted () {
        for (let i = 0; i < this.notes.length; i++) {
            if (this.notes[i].id === this.id) {
                this.title = this.notes[i].title
                this.note = this.notes[i].note
            }
        }
        this.$refs.title.focus();
    },
    created () {
        axios.get(`http://${store.state.localhost}/notes`).then((response) => {
            this.notes = response.data
        }),
        axios.get(`http://${store.state.localhost}/notes/${this.id}`).then((response) => {
            this.title = response.data.title
            this.note = response.data.note
        })
    }
}
</script>

<style scoped>
    .shareButton {
        position: absolute;
        bottom: 1.5rem;
        right: 2rem;
        background-color: yellowgreen;
        z-index: -1;
    }
</style>