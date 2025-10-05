<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { usePokemonStore } from '../stores/pokemon';
import LoadingState from './LoadingState.vue';
import Search from './common/Search.vue';
import PokemonList from './PokemonList.vue';
import PokemonDetails from './PokemonDetails.vue';

const pokemonStore = usePokemonStore();
const { pokemons, isLoading } = storeToRefs(pokemonStore);
const { fetchPokemons, fetchPokemonDetails } = pokemonStore;

onMounted(async () => {
  await fetchPokemons();
});

const toggleModal = ref(false);

const handleOpenModal = (pokemon) => {
  toggleModal.value = pokemon.openModal;
  fetchPokemonDetails(pokemon.name);
  console.log(pokemon);
};

const handleToggleFavorite = (pokemon) => {
  console.log(pokemon);
};

const handleCloseModal = (toggle) => {
  toggleModal.value = toggle;
};
</script>

<template>
  <LoadingState v-if="isLoading && !pokemons.length" />
  <section
    v-else
    class="pokemon-explorer"
  >
    <Search />
    <PokemonList
      @open-modal="handleOpenModal"
      @toggle-favorite="handleToggleFavorite"
    />
    <Teleport to="body">
      <PokemonDetails
        v-if="toggleModal"
        @close-modal="handleCloseModal"
      />
    </Teleport>
  </section>
</template>

<style scoped>
.pokemon-explorer {
  max-width: 35.625rem;
  padding: 2.25rem 1.875rem;
  margin: 0 auto;
}
</style>
