<script setup>
import ListItem from './ListItem.vue';

const emit = defineEmits(['toggle-favorite', 'open-modal']);

defineProps({
  pokemons: {
    type: Array,
    default() {
      return [];
    },
  },
  isFavorite: {
    type: Boolean,
    default: false,
  }
});
</script>

<template>
    <ul class="list">
      <li v-for="pokemon in pokemons" :key="pokemon.name" class="list__element">
        <ListItem :name="pokemon.name" :is-favorite="isFavorite" @open-modal="emit('open-modal', $event)" @toggle-favorite="emit('open-modal', $event)" />
      </li>
    </ul>
</template>

<style scoped>
.list {
  width: 100%;
}

.list__element:not(:last-child) {
  margin-bottom: 0.625rem;
}
</style>