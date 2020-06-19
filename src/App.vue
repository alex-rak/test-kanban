<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "App",
  created() {
    if (window.localStorage.getItem("token")) {
      this.setTokenFromLocalStorage();
    }
  },
  methods: {
    ...mapMutations("users", [
      "setTokenFromLocalStorage",
    ]),
  },
};
</script>

<style lang="scss">
* {
  padding: 0 0;
  margin: 0 0;
  font-size: 14px;
  box-sizing: border-box;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
body {
  background: #373A42;
}
</style>
