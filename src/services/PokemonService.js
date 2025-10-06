const getPokemons = async (url = 'https://pokeapi.co/api/v2/pokemon') => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching Pokemon list: ${error}.`);
    throw new Error('Unable to get Pokemon list.');
  }
};

const getPokemonDetails = async (name) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching details about this Pokemon: ${error}.`);
    throw new Error('Unable to get details about this Pokemon.');
  }
};

export { getPokemons, getPokemonDetails };
