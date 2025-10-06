import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { usePokemonStore } from '../pokemon';
import { getPokemons, getPokemonDetails } from '../../services/PokemonService';

vi.mock('../../services/PokemonService', () => ({
  getPokemons: vi.fn(),
  getPokemonDetails: vi.fn(),
}));

describe('Pokemon Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  describe('fetchPokemons', () => {
    it('should fetch initial pokemon list successfully', async () => {
      const mockData = {
        results: [
          { name: 'bulbasaur', url: 'pokemon/1' },
          { name: 'charmander', url: 'pokemon/4' },
        ],
        next: 'pokemon?offset=20',
      };
      getPokemons.mockResolvedValueOnce(mockData);

      const store = usePokemonStore();
      await store.fetchPokemons();

      expect(store.pokemons).toEqual(mockData.results);
      expect(store.nextUrl).toBe('pokemon?offset=20');
      expect(store.hasMore).toBe(true);
      expect(store.isLoading).toBe(false);
      expect(store.error).toBeNull();
    });

    it('should handle fetch errors', async () => {
      const errorMessage = 'Failed to fetch';
      getPokemons.mockRejectedValueOnce(new Error(errorMessage));

      const store = usePokemonStore();
      await store.fetchPokemons();

      expect(store.error).toBe(errorMessage);
      expect(store.isLoading).toBe(false);
      expect(store.pokemons).toEqual([]);
    });
  });

  describe('loadMorePokemons', () => {
    it('should load more pokemons when available', async () => {
      const store = usePokemonStore();
      const initialPokemons = [{ name: 'bulbasaur' }];
      const morePokemons = [{ name: 'charmander' }];

      store.pokemons = initialPokemons;
      store.hasMore = true;
      store.nextUrl = 'next-page-url';

      getPokemons.mockResolvedValueOnce({
        results: morePokemons,
        next: null,
      });

      await store.loadMorePokemons();

      expect(store.pokemons).toEqual([...initialPokemons, ...morePokemons]);
      expect(store.hasMore).toBe(false);
    });

    it('should not load more pokemons when hasMore is false', async () => {
      const store = usePokemonStore();
      store.hasMore = false;

      await store.loadMorePokemons();

      expect(getPokemons).not.toHaveBeenCalled();
    });
  });

  describe('fetchPokemonDetails', () => {
    it('should fetch pokemon details successfully', async () => {
      const mockDetails = {
        name: 'pikachu',
        types: [{ type: { name: 'electric' } }],
      };
      getPokemonDetails.mockResolvedValueOnce(mockDetails);

      const store = usePokemonStore();
      await store.fetchPokemonDetails('pikachu');

      expect(store.pokemonDetails).toEqual(mockDetails);
      expect(store.isLoading).toBe(false);
      expect(store.error).toBeNull();
    });

    it('should handle details fetch error', async () => {
      const errorMessage = 'Pokemon not found';
      getPokemonDetails.mockRejectedValueOnce(new Error(errorMessage));

      const store = usePokemonStore();
      await store.fetchPokemonDetails('invalidPokemon');

      expect(store.error).toBe(errorMessage);
      expect(store.isLoading).toBe(false);
      expect(store.pokemonDetails).toEqual({});
    });

    it('should reset pokemon details before fetching new ones', async () => {
      const store = usePokemonStore();
      store.pokemonDetails = { name: 'old-pokemon' };

      getPokemonDetails.mockRejectedValueOnce(new Error('error'));
      await store.fetchPokemonDetails('new-pokemon');

      expect(store.pokemonDetails).toEqual({});
    });
  });
});
