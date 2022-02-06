<template>
  <div id="app">
    <div class="app-container">
      <img alt="Vue logo" src="./assets/primevue-logo.png">
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