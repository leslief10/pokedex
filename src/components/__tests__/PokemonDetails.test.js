import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import PokemonDetails from '../PokemonDetails.vue';
import { useFavoritesStore } from '../../stores/favorites';

describe('PokemonDetails', () => {
  let wrapper;
  let favoritesStore;

  const mockPokemonDetails = {
    abilities: [
      { ability: { name: 'static' } },
      { ability: { name: 'lightning-rod' } },
    ],
    name: 'pikachu',
    types: [{ type: { name: 'electric' } }],
    weight: 60,
    height: 4,
    sprites: {
      other: {
        'official-artwork': {
          front_default: 'pikachu.png',
        },
      },
    },
  };

  beforeEach(() => {
    wrapper = mount(PokemonDetails, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              pokemon: { pokemonDetails: mockPokemonDetails },
              favorites: { favorites: [] },
            },
          }),
        ],
      },
    });
    // pokemonStore = usePokemonStore()
    favoritesStore = useFavoritesStore();
  });

  it('should render pokemon details correctly', () => {
    expect(wrapper.find('img').attributes('src')).toBe('pikachu.png');
    expect(wrapper.find('img').attributes('alt')).toBe('pikachu');
    expect(wrapper.text()).toContain('electric');
    expect(wrapper.text()).toContain('60');
    expect(wrapper.text()).toContain('4');
  });

  it('should emit close-modal when close button is clicked', async () => {
    const closeButton = wrapper.findComponent('[data-testid="close-button"]');
    await closeButton.vm.$emit('button-clicked');

    expect(wrapper.emitted('close-modal')).toBeTruthy();
    expect(wrapper.emitted('close-modal')[0]).toEqual([false]);
  });

  it('should toggle favorite status when favorite button is clicked', async () => {
    const favoriteButton = wrapper.findComponent(
      '[data-testid="toggle-fav-button"]',
    );
    await favoriteButton.vm.$emit('button-clicked');

    expect(favoritesStore.toggleFavorite).toHaveBeenCalledWith('pikachu');
  });

  it('should copy pokemon data to clipboard when copy button is clicked', async () => {
    const mockClipboard = {
      writeText: vi.fn().mockResolvedValue(undefined),
    };
    Object.defineProperty(navigator, 'clipboard', {
      value: mockClipboard,
      writable: true,
    });

    const copyButton = wrapper.findComponent('[data-testid="share-button"]');
    await copyButton.vm.$emit('button-clicked');

    expect(mockClipboard.writeText).toHaveBeenCalledWith(
      expect.stringContaining(mockPokemonDetails.name),
    );
  });
});
