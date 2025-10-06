<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { usePokemonStore } from '../stores/pokemon';
import { useModal } from '../composables/useModal';
import { useViewManager } from '../composables/useViewManager';
import LoadingState from './LoadingState.vue';
import EmptyState from './common/EmptyState.vue';
import PokemonSearch from './PokemonSearch.vue';
import PokemonDetails from './PokemonDetails.vue';
import ButtonBar from './ButtonBar.vue';

const pokemonStore = usePokemonStore();
const { pokemons, isLoading, error } = storeToRefs(pokemonStore);
const { fetchPokemons, fetchPokemonDetails } = pokemonStore;

const {isOpen: toggleModal, open: openModal, close: closeModal} = useModal();
const { activeComponent, setView } = useViewManager();

onMounted(async () => {
  await fetchPokemons();
});

const emptyStateProps = {
  title: 'Uh-oh!',
  message: 'You look lost on your journey!',
  showButton: true,
  buttonText: 'Go back home',
};

const emit = defineEmits(['display-home']);

const handleOpenModal = async (pokemon) => {
  await fetchPokemonDetails(pokemon.name);

  if (!error.value) {
    openModal();
  }
};

</script>

<template>
  <LoadingState v-if="isLoading && !pokemons.length" />
  <section
    v-else
    class="pokemon-explorer"
  >
    <PokemonSearch @pokemon-search="handleOpenModal" />
    <EmptyState
      v-if="!pokemons.length"
      v-bind="emptyStateProps"
      @button-clicked="emit('display-home', false)"
    />
    <KeepAlive v-else>
      <component
        :is="activeComponent"
        @open-modal="handleOpenModal"
      />
    </KeepAlive>
    <Teleport to="body">
      <PokemonDetails
        v-if="toggleModal"
        @close-modal="closeModal"
      />
    </Teleport>
    <ButtonBar
      v-if="pokemons.length"
      @toggle-view="setView"
    />
  </section>
</template>

<style scoped>
.pokemon-explorer {
  position: relative;
  max-width: 35.625rem;
  min-height: inherit;
  padding: 2.25rem 1.875rem;
  margin: 0 auto;
}
</style>
