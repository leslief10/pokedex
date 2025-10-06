<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { usePokemonStore } from '../../stores/pokemon';
import List from '../common/List.vue';
import PokemonItem from '../PokemonItem.vue';

const pokemonStore = usePokemonStore();
const { pokemons, isLoading, hasMore } = storeToRefs(pokemonStore);
const { loadMorePokemons } = pokemonStore;
const listRef = ref(null);

const emit = defineEmits(['open-modal']);

const handleScroll = () => {
  if (isLoading.value || !hasMore.value) return;

  const list = listRef.value.$el;
  const threshold = 100;

  if (list.getBoundingClientRect().bottom - threshold <= window.innerHeight) {
    loadMorePokemons();
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <List
    ref="listRef"
    :items="pokemons"
    :item-component="PokemonItem"
    @open-modal="emit('open-modal', $event)"
  />
  <div
    v-if="isLoading"
    class="loading-indicator"
  >
    Loading more Pokémons...
  </div>
</template>

<style scoped>
.loading-indicator {
  text-align: center;
  padding: 1rem;
  color: var(--medium-grey);
}
</style>
