<template>
  <div>
    <Test class="mt-5 mx-20" />
    <comment-element class="w-10/12 mx-auto" />
  </div>
</template>

<script>
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
// @ts-ignore
import Test from "../src/assets/md/SPA.md"; //

export default {
  name: "App",

  name: "App",
  components: {
    HelloWorld,
    Test,
  },

  setup() {
    const msg = ref(
      "Welcome to Element Plus, a Vue 3.0 based component library"
    );
    const startHacking = () => {
      msg.value = "Start coding with Element Plus with 💖";
    };
    return {
      msg,
      startHacking,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */

  margin-top: 60px;
}
.logo {
  width: 50%;
}
.btn {
  color: #2c3e50;
  margin-top: 100px;
}
</style>
