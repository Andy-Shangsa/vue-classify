<template>
  <div id="app">
    <v-classify :classifyList="classifyList"></v-classify>
  </div>
</template>

<script>
import { _CLASSIFY_LIST } from "./lib/mock";
export default {
  name: "app",
  data() {
    return {
      classifyList: _CLASSIFY_LIST
    };
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
