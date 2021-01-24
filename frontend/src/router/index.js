import Vue from 'vue'
import VueRouter from 'vue-router'
import Notes from '../views/Notes.vue'
import NewNote from '../views/NewNote.vue'
import Note from '../views/Note.vue'
import Lists from '../views/Lists.vue'
import NewList from '../views/NewList.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import Share from '../views/Share.vue'

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
    path: '/newList',
    name: 'newList',
    component: NewList
  },
  {
    path: '/Note/:id',
    name: 'Note',
    component: Note
  },
  {
    path: '/Lists',
    name: 'List',
    component: Lists
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/share',
    name: 'share',
    component: Share
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
