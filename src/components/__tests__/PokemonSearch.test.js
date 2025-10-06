import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import PokemonSearch from '../PokemonSearch.vue';

describe('PokemonSearch', () => {
  it('should emit pokemon-search with correct payload', async () => {
    const wrapper = mount(PokemonSearch, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    await wrapper
      .findComponent({ name: 'Search' })
      .vm.$emit('search', 'pikachu');

    expect(wrapper.emitted('pokemon-search')[0][0]).toEqual({
      name: 'pikachu',
      openModal: true,
    });
  });

  it('should pass error prop to Search component', async () => {
    const wrapper = mount(PokemonSearch, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              pokemon: { error: 'Test error' },
            },
          }),
        ],
      },
    });

    expect(wrapper.findComponent({ name: 'Search' }).props('error')).toBe(
      'Test error',
    );
  });
});
