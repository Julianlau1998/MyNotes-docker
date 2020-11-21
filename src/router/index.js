import Vue from 'vue'
import VueRouter from 'vue-router'
import Notes from '../views/Notes.vue'
import NewNote from '../views/NewNote.vue'
import Note from '../views/Note.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'notes',
    component: Notes
  },
  {
    path: '/newNote',
    name: 'newNote',
    component: NewNote
  },
  {
    path: '/Note',
    name: 'Note',
    component: Note
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
