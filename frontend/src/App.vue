<template>
  <router-view/>
</template>

<script>
export default {
  created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.showUpgradeUI = true;
      });
    }
  },

  methods: {
    async accept() {
      this.showUpgradeUI = false
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(201, 201, 201);
}
body {
  background-color: #0f1820;
  margin-top: 0.5rem;
}
    .plusButton {
        position: fixed;
        bottom: 1rem;
        padding-bottom: 3.5rem;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 4.9rem;
        height: 4.9rem;
        font-size: 3.2em;
        background-color: transparent;
        border-radius: 100%;
        border: none;
        box-shadow: -1px -1px 4px 0px rgb(133, 133, 133),
                     1px 1px 5px 2px black;
        color: white;
    }
    .line {
        border-top: 6px dashed rgb(158, 63, 0);
        border-bottom: none;
        border-right: transparent;
        border-left: transparent;
        color: transparent;
    }
    .header {
      margin: 2rem 0 1rem;
      font-family: Avenir, Helvetica, Arial, sans-serif;
      letter-spacing: 5px;
    }

    /*** Note / NewNote ***/
    .arrow {
        width: 2.5rem;
        height: 3rem;
        position: absolute;
        left: 1rem;
        top: 0.2rem;
    }
    .delete {
        width: 2.2rem;
        position: absolute;
        right: 1rem;
        top: 0.6rem;
    }
    #title {
        font-size: 1.5rem;
        background-color: rgb(23, 25, 27);
        background-color: rgb(54, 61, 68);
        color: lightgray;
        border: none;

    }
    #note {
        height: 68vh;
        font-size: 2rem;
        background-color: rgb(54, 61, 68);
        color: lightgray;
        border: none;
    }
    .saveButton {
        width: 10rem;
        height: 3rem;
        font-weight: bolder;
        font-size: 1.2rem;
        position: absolute;
        bottom: 1.5rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: -1;

        border-radius: 0.7rem;
        background-color: transparent;
        border: none;
        box-shadow: -1px -1px 4px 0px rgb(133, 133, 133),
                    1px 1px 5px 2px black;
        color: lightgray;
        font-weight: 900;
        font-size: larger;
        margin-top: 5rem;
    }
    .errorMessage{
      color: red;
    }
    .header {
      font-size: 3.5rem;
      color: lightgray;
      text-align: center;
    }
    .whiteLine{
        border-top: 3px solid rgb(134, 134, 134);
        width: 12.5rem;
        margin-top: -0.5rem;
        margin-bottom: 1rem;
    }
    .white{
      color: white;
    }
    .centered {
      display: block;
      text-align: center;
    }
    .homeButton {
      overflow-wrap: break-word; 
      width: 8rem;
      height: 4rem;
      border-radius: 1rem;
      background-color: transparent;
      border: none;
      box-shadow: -1px -1px 4px 0px rgb(133, 133, 133),
                  1px 1px 5px 2px black;
      color: lightgray;
      position: absolute;
      bottom: 1rem;
      left: 50%;
      transform: translate(-50%, -50%);
      color: lightgray;
        font-weight: 600;
        font-size: larger;
    }
    #login {
        display: flex;
        justify-content: center;
        margin: 0 auto;
        align-items: center;
        margin-top: 3rem;
        width: 12rem;
        height: 2.6rem;
        border: none;
    } 
    #googleImage {
        width: 12.3rem;
    }
    #register {
        margin: 6rem auto;
        display: flex;
        justify-content: center;
        text-align: center;
        
        width: 11rem;
        height: 4rem;
        padding: 0.3rem;
        border-radius: 1rem;
        background-color: transparent;
        border: none;
        box-shadow: -1px -1px 4px 0px rgb(133, 133, 133),
                    1px 1px 5px 2px black;
        color: lightgray;
        font-weight: 400;
        font-size: larger;
    } 
</style>
