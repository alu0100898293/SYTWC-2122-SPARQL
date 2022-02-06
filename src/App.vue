<template>
  <div id="app">
    <div class="app-container">
      <h1> Wikidata Query Service for Novels</h1>
      <h2> Instructions</h2>
      <p> The unique <b>required field </b> is the author, it's case sensitive and 
      you need to introduce the full name of the author</p>
      <p> The rest of params are optionals and dont need the full name, for example, if you 
        are looking for the <i>science fiction</i> genre, you can search by the genre science, 
        but it's still case sensitive.</p>
      <p> The publish date must be in the format yyyy-mm-dd, including the left ceros </p>
      <MainView />
    </div>

    <Toast/>
  </div>
</template>

<script>
import MainView from './components/MainView.vue'

export default {
    data() {
        return {
            message: null,
            text: null
        }
    },
    components: {
      MainView
    }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.app-container {
  text-align: center;
}

body #app .p-button {
  margin-left: .2em;
}

form {
  margin-top: 2em;
}
</style>