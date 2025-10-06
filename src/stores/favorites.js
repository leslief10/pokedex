import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref(JSON.parse(localStorage.getItem('favorites')) || []);

  function toggleFavorite(pokemonName) {
    const index = favorites.value.findIndex(
      (pokemon) => pokemon.name === pokemonName,
    );

    if (index === -1) {
      favorites.value.push({ name: pokemonName });
    } else {
      favorites.value.splice(index, 1);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites.value));
  }

  function isFavorite(pokemonName) {
    return favorites.value.some((pokemon) => pokemon.name === pokemonName);
  }

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
});
