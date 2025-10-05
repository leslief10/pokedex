import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getPokemons, getPokemonDetails } from '../services/PokemonService';

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemons = ref([]);
  const pokemonDetails = ref({});
  const isLoading = ref(false);
  const error = ref(null);
  const nextUrl = ref(null);
  const hasMore = ref(true);

  async function fetchPokemons(url = 'https://pokeapi.co/api/v2/pokemon') {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await getPokemons(url);
      pokemons.value = [...pokemons.value, ...data.results];
      nextUrl.value = data.next;
      hasMore.value = !!data.next;
    } catch (e) {
      error.value = e.message;
    } finally {
      isLoading.value = false;
    }
  }

  async function loadMorePokemons() {
    if (hasMore.value && nextUrl.value) {
      await fetchPokemons(nextUrl.value);
    }
  }

  async function fetchPokemonDetails(name) {
    isLoading.value = true;
    error.value = null;
    pokemonDetails.value = {};

    try {
      const data = await getPokemonDetails(name);
      pokemonDetails.value = data;
    } catch (e) {
      error.value = e.message;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    pokemons,
    pokemonDetails,
    isLoading,
    error,
    hasMore,
    fetchPokemons,
    loadMorePokemons,
    fetchPokemonDetails,
  };
});
