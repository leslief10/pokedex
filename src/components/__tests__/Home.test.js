import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import Home from '../Home.vue';

describe('Home', () => {
  it('should render PokemonExplorer component', () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    expect(wrapper.findComponent({ name: 'PokemonExplorer' }).exists()).toBe(
      true,
    );
  });

  it('should forward display-home event from PokemonExplorer', async () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const explorer = wrapper.findComponent({ name: 'PokemonExplorer' });
    await explorer.vm.$emit('display-home', false);

    expect(wrapper.emitted('display-home')).toBeTruthy();
    expect(wrapper.emitted('display-home')[0]).toEqual([false]);
  });
});
