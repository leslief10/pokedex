<script setup>
import PokemonExplorer from './PokemonExplorer.vue';

const emit = defineEmits(['display-home']);
</script>

<template>
  <PokemonExplorer @display-home="emit('display-home', $event)" />
</template>

<style scoped></style>
