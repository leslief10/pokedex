<script setup>
import { onMounted } from 'vue';
import { getPokemons, getPokemonDetails } from './services/PokemonService';
import Home from './components/Home.vue';
// import LoadingState from './components/LoadingState.vue';

onMounted(async () => {
  getPokemons();
  getPokemonDetails();
})
</script>

<template>
  <main class="main">
    <Home />
    <!-- <LoadingState /> -->
  </main>
</template>

<style scoped>
</style>
