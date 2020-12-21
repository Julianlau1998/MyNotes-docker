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
            <br>
            <div class="form-group paddingTop scroll">
                <div type="test" class="form-control" id="note"  placeholder="List">
                    <ul>
                        <li v-for="(item, itemKey) in listElements" :key="itemKey">
                            <input type="text" id="listElement" @focus="newElement">
                        </li>
                    </ul>
                </div>        
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
            list: '',
            currentObject: {title: '', list: '', id: ""},
            listsList: JSON.parse(localStorage.getItem('lists')),
            id: this.$uuidKey(),
            listElements: ['', '']
        }
    },
    methods: {
        save () {
            if(this.listsList===null) {
                this.listsList = []
            }
            this.currentObject.title = this.title
            this.currentObject.list = this.list
            this.currentObject.id = this.id
            this.listsList.push(this.currentObject)
            localStorage.setItem('id', this.id)
            localStorage.setItem('lists',JSON.stringify(this.listsList))
            this.$router.push('/')
        },
        newElement () {
            this.listElements.push('')
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
  ul li {
      list-style-type: none;
      margin-left: -2rem;
      margin-bottom: 0.8rem;
  }

  input {
      margin-right: 10rem;
      color: lightgray;
      border: none;
      box-shadow: -1px -1px 4px 0px rgb(133, 133, 133),
                1px 1px 5px 2px black;
  }
  .scroll{
      overflow-x: hidden;
      overflow-y: scroll;
  }
  #listElement {
      background: none;
      width: 75vw;
      margin-bottom: 0.5rem;
      background-color:  rgb(54, 61, 68);
  }
  #note{
      background-color: #0f1820;
      height: 63vh;
  }
  #trashcan {
      width: 2rem;
  }
</style>