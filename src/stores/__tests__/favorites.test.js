import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useFavoritesStore } from '../favorites';

describe('Favorites Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  describe('initialization', () => {
    it('should start with empty favorites if no localStorage data', () => {
      const store = useFavoritesStore();
      expect(store.favorites).toEqual([]);
    });

    it('should load existing favorites from localStorage', () => {
      const existingFavorites = [{ name: 'pikachu' }, { name: 'charizard' }];
      localStorage.setItem('favorites', JSON.stringify(existingFavorites));

      const store = useFavoritesStore();
      expect(store.favorites).toEqual(existingFavorites);
    });
  });

  describe('toggleFavorite', () => {
    it('should add pokemon to favorites when not favorited', () => {
      const store = useFavoritesStore();
      const pokemonName = 'pikachu';

      store.toggleFavorite(pokemonName);

      expect(store.favorites).toContainEqual({ name: pokemonName });
      expect(localStorage.getItem('favorites')).toBe(
        JSON.stringify([{ name: pokemonName }]),
      );
    });

    it('should remove pokemon from favorites when already favorited', () => {
      const store = useFavoritesStore();
      const pokemonName = 'pikachu';

      store.toggleFavorite(pokemonName);

      store.toggleFavorite(pokemonName);

      expect(store.favorites).toEqual([]);
      expect(localStorage.getItem('favorites')).toBe('[]');
    });
  });

  describe('isFavorite', () => {
    it('should return true for favorited pokemon', () => {
      const store = useFavoritesStore();
      const pokemonName = 'pikachu';

      store.toggleFavorite(pokemonName);

      expect(store.isFavorite(pokemonName)).toBe(true);
    });

    it('should return false for non-favorited pokemon', () => {
      const store = useFavoritesStore();

      expect(store.isFavorite('mewtwo')).toBe(false);
    });
  });

  describe('localStorage integration', () => {
    it('should update localStorage when favorites change', () => {
      const store = useFavoritesStore();
      const pokemonName = 'pikachu';

      store.toggleFavorite(pokemonName);

      const storedData = JSON.parse(localStorage.getItem('favorites'));
      expect(storedData).toContainEqual({ name: pokemonName });
    });
  });
});
