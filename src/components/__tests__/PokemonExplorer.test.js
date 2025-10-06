import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { usePokemonStore } from '../../stores/pokemon';
import PokemonExplorer from '../PokemonExplorer.vue';

describe('PokemonExplorer', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    wrapper = mount(PokemonExplorer, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              pokemon: {
                pokemons: [],
                isLoading: false,
                error: null,
              },
            },
          }),
        ],
      },
    });
    store = usePokemonStore();
  });

  it('should show loading state when fetching initial data', async () => {
    store.isLoading = true;
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent({ name: 'LoadingState' }).exists()).toBe(true);
  });

  it('should show empty state when no pokemons are available', async () => {
    store.isLoading = false;
    store.pokemons = [];
    await wrapper.vm.$nextTick();

    const emptyState = wrapper.findComponent({ name: 'EmptyState' });
    expect(emptyState.exists()).toBe(true);
    expect(emptyState.props()).toMatchObject({
      title: 'Uh-oh!',
      message: 'You look lost on your journey!',
      showButton: true,
      buttonText: 'Go back home',
    });
  });

  it('should fetch pokemon details and open modal when pokemon is selected', async () => {
    const pokemon = { name: 'pikachu' };
    await wrapper.vm.handleOpenModal(pokemon);

    expect(store.fetchPokemonDetails).toHaveBeenCalledWith('pikachu');
    expect(wrapper.findComponent({ name: 'PokemonDetails' }).exists()).toBe(
      true,
    );
  });

  it('should not open modal if there is an error fetching details', async () => {
    store.error = 'Failed to fetch';
    const pokemon = { name: 'pikachu' };
    await wrapper.vm.handleOpenModal(pokemon);

    expect(wrapper.findComponent({ name: 'PokemonDetails' }).exists()).toBe(
      false,
    );
  });

  it('should show ButtonBar when pokemons are available', async () => {
    store.pokemons = [{ name: 'pikachu' }];
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent({ name: 'ButtonBar' }).exists()).toBe(true);
  });

  it('should change view when ButtonBar emits toggle-view', async () => {
    store.pokemons = [{ name: 'pikachu' }];
    await wrapper.vm.$nextTick();

    const buttonBar = wrapper.findComponent({ name: 'ButtonBar' });
    await buttonBar.vm.$emit('toggle-view', 'FavPokemonList');

    expect(wrapper.findComponent({ name: 'FavPokemonList' }).exists()).toBe(
      true,
    );
  });

  it('should emit display-home event when EmptyState button is clicked', async () => {
    store.pokemons = [];
    await wrapper.vm.$nextTick();

    const emptyState = wrapper.findComponent({ name: 'EmptyState' });
    await emptyState.vm.$emit('button-clicked');

    expect(wrapper.emitted('display-home')).toBeTruthy();
    expect(wrapper.emitted('display-home')[0]).toEqual([false]);
  });
});
