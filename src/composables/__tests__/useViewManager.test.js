import { describe, it, expect } from 'vitest';
import { useViewManager } from '../useViewManager';
import PokemonList from '../../components/views/PokemonList.vue';
import FavPokemonList from '../../components/views/FavPokemonList.vue';

describe('useViewManager', () => {
  it('should initialize with PokemonList as default view', () => {
    const { currentView, activeComponent } = useViewManager();

    expect(currentView.value).toBe('PokemonList');
    expect(activeComponent.value).toBe(PokemonList);
  });

  it('should switch to FavPokemonList when view is changed', () => {
    const { currentView, activeComponent, setView } = useViewManager();

    setView('FavPokemonList');

    expect(currentView.value).toBe('FavPokemonList');
    expect(activeComponent.value).toBe(FavPokemonList);
  });

  it('should switch back to PokemonList when view is changed', () => {
    const { currentView, activeComponent, setView } = useViewManager();

    setView('FavPokemonList');
    expect(currentView.value).toBe('FavPokemonList');

    setView('PokemonList');
    expect(currentView.value).toBe('PokemonList');
    expect(activeComponent.value).toBe(PokemonList);
  });
});
