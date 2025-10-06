import { ref, computed } from "vue";
import PokemonList from "../components/views/PokemonList.vue";
import FavPokemonList from "../components/views/FavPokemonList.vue";

export function useViewManager() {
  const currentView = ref('PokemonList');

  const activeComponent = computed(() => {
    return currentView.value === 'PokemonList' ? PokemonList : FavPokemonList;
  });

  const setView = (view) => {
    currentView.value = view;
  };

  return {
    currentView,
    activeComponent,
    setView,
  };
}