import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ButtonBar from '../ButtonBar.vue';

describe('ButtonBar', () => {
  it('should initialize with PokemonList as active view', () => {
    const wrapper = mount(ButtonBar);
    const allButton = wrapper.findAllComponents({ name: 'Button' })[0];

    expect(wrapper.vm.activeView).toBe('PokemonList');
    expect(allButton.classes()).not.toContain('inactive');
  });

  it('should toggle active view when button is clicked', async () => {
    const wrapper = mount(ButtonBar);
    const favoritesButton = wrapper.findAllComponents({ name: 'Button' })[1];

    await favoritesButton.vm.$emit('button-clicked');

    expect(wrapper.vm.activeView).toBe('FavPokemonList');
    expect(wrapper.emitted('toggle-view')).toBeTruthy();
    expect(wrapper.emitted('toggle-view')[0]).toEqual(['FavPokemonList']);
  });

  it('should apply inactive class to non-active view button', async () => {
    const wrapper = mount(ButtonBar);
    const [allButton, favoritesButton] = wrapper.findAllComponents({
      name: 'Button',
    });

    await favoritesButton.vm.$emit('button-clicked');

    expect(allButton.classes()).toContain('inactive');
    expect(favoritesButton.classes()).not.toContain('inactive');
  });
});
