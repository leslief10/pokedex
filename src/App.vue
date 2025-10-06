<script setup>
import { ref } from 'vue';
import Welcome from './components/Welcome.vue';
import Home from './components/Home.vue';

const showHome = ref(false);

const handleDisplayHome = (value) => {
  showHome.value = value;
};
</script>

<template>
  <main class="app">
    <Welcome
      v-if="!showHome"
      @display-home="handleDisplayHome"
    />
    <Home
      v-else
      @display-home="handleDisplayHome"
    />
  </main>
</template>

<style scoped>
.app {
  width: 100%;
  min-height: inherit;
  background-color: var(--almost-white);
}
</style>
