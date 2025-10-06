import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import PokemonList from '../../views/PokemonList.vue';

describe('PokemonList', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should render pokemon list', () => {
    const wrapper = mount(PokemonList, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              pokemon: {
                pokemons: [{ name: 'pikachu' }, { name: 'charmander' }],
                isLoading: false,
              },
            },
          }),
        ],
      },
    });

    expect(wrapper.findComponent({ name: 'List' }).props('items')).toHaveLength(
      2,
    );
  });

  it('should show loading indicator when loading more pokemon', async () => {
    const wrapper = mount(PokemonList, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              pokemon: { isLoading: true },
            },
          }),
        ],
      },
    });

    expect(wrapper.find('.loading-indicator').exists()).toBe(true);
    expect(wrapper.text()).toContain('Loading more Pokémons...');
  });

  it('should load more pokemon on scroll', async () => {
    const wrapper = mount(PokemonList, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const store = wrapper.vm.pokemonStore;
    const mockRect = { bottom: window.innerHeight - 50 };
    wrapper.vm.listRef.$el.getBoundingClientRect = () => mockRect;

    window.dispatchEvent(new Event('scroll'));

    expect(store.loadMorePokemons).toHaveBeenCalled();
  });
});
