<script setup>
import { storeToRefs } from 'pinia';
import { useFavoritesStore } from '../../stores/favorites';
import List from '../common/List.vue';
import EmptyState from '../common/EmptyState.vue';
import PokemonItem from '../PokemonItem.vue';

const favoritesStore = useFavoritesStore();
const { favorites } = storeToRefs(favoritesStore);

const emptyStateProps = {
  title: 'Uh-oh!',
  message: `You haven't added any Pokemons to your favorites list.`,
};

const emit = defineEmits(['open-modal']);
</script>

<template>
  <EmptyState
    v-if="!favorites.length"
    v-bind="emptyStateProps"
  />
  <List
    v-else
    class="fav-pokemon-list"
    :items="favorites"
    :item-component="PokemonItem"
    @open-modal="emit('open-modal', $event)"
  />
</template>

<style scoped>
.fav-pokemon-list {
  padding-bottom: 4.375rem;
}
</style>
