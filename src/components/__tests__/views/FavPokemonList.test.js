import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import FavPokemonList from '../../views/FavPokemonList.vue';

describe('FavPokemonList', () => {
  it('should show empty state when no favorites', () => {
    const wrapper = mount(FavPokemonList, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              favorites: { favorites: [] },
            },
          }),
        ],
      },
    });

    const emptyState = wrapper.findComponent({ name: 'EmptyState' });
    expect(emptyState.exists()).toBe(true);
    expect(emptyState.props('title')).toBe('Uh-oh!');
  });

  it('should render favorite pokemon list', () => {
    const wrapper = mount(FavPokemonList, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              favorites: {
                favorites: [{ name: 'pikachu' }, { name: 'charmander' }],
              },
            },
          }),
        ],
      },
    });

    expect(wrapper.findComponent({ name: 'List' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'List' }).props('items')).toHaveLength(
      2,
    );
  });

  it('should forward open-modal event', async () => {
    const wrapper = mount(FavPokemonList, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              favorites: {
                favorites: [{ name: 'pikachu' }],
              },
            },
          }),
        ],
      },
    });

    await wrapper
      .findComponent({ name: 'List' })
      .vm.$emit('open-modal', { name: 'pikachu' });

    expect(wrapper.emitted('open-modal')).toBeTruthy();
    expect(wrapper.emitted('open-modal')[0][0]).toEqual({ name: 'pikachu' });
  });
});
