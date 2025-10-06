import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getPokemons, getPokemonDetails } from '../PokemonService';

describe('PokemonService', () => {
  beforeEach(() => {
    window.fetch.mockReset();
    window.fetch = vi.fn();
  });

  describe('getPokemons', () => {
    it('should fetch pokemon list successfully', async () => {
      const mockResponse = {
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
        ],
        next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
      };

      window.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await getPokemons();

      expect(result).toEqual(mockResponse);
      expect(window.fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon',
      );
    });

    it('should handle network errors', async () => {
      window.fetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(getPokemons()).rejects.toThrow('Unable to get Pokemon list');
    });

    it('should handle non-ok responses', async () => {
      window.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(getPokemons()).rejects.toThrow(
        'Unable to get Pokemon list.',
      );
    });

    it('should use provided URL when specified', async () => {
      const customUrl = 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20';
      window.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ results: [] }),
      });

      await getPokemons(customUrl);

      expect(window.fetch).toHaveBeenCalledWith(customUrl);
    });
  });

  describe('getPokemonDetails', () => {
    it('should fetch pokemon details successfully', async () => {
      const mockPokemon = {
        name: 'pikachu',
        height: 4,
        weight: 60,
        types: [{ type: { name: 'electric' } }],
      };

      window.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPokemon),
      });

      const result = await getPokemonDetails('pikachu');

      expect(result).toEqual(mockPokemon);
      expect(window.fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/pikachu',
      );
    });

    it('should handle network errors in details fetch', async () => {
      window.fetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(getPokemonDetails('pikachu')).rejects.toThrow(
        'Unable to get details about this Pokemon.',
      );
    });

    it('should handle non-ok responses in details fetch', async () => {
      window.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(getPokemonDetails('invalidPokemon')).rejects.toThrow(
        'Unable to get details about this Pokemon.',
      );
    });
  });
});
