import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import PokemonItem from '../PokemonItem.vue';

describe('PokemonItem', () => {
  const mountComponent = (props = {}) => {
    return mount(PokemonItem, {
      props,
      global: {
        plugins: [createTestingPinia()],
      },
    });
  };

  it('should render with default props', () => {
    const wrapper = mountComponent();
    expect(wrapper.props('name')).toBe('Pikachu');
  });

  it('should emit open-modal with correct payload', async () => {
    const wrapper = mountComponent({ name: 'Charmander' });
    await wrapper.findComponent({ name: 'ListItem' }).vm.$emit('open-modal');

    expect(wrapper.emitted('open-modal')[0][0]).toEqual({
      name: 'Charmander',
      openModal: true,
    });
  });

  it('should toggle favorite status', async () => {
    const wrapper = mountComponent({ name: 'Bulbasaur' });
    const favoritesStore = wrapper.vm.favoritesStore;

    await wrapper
      .findComponent({ name: 'ListItem' })
      .vm.$emit('toggle-favorite');

    expect(favoritesStore.toggleFavorite).toHaveBeenCalledWith('Bulbasaur');
  });
});
