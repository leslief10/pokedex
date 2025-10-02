const getPokemons = async () => {
  const url = 'https://pokeapi.co/api/v2/pokemon';
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    console.log('get Pokemons:', data);
    
  } catch (error) {
    console.log(`Error fetching a full Pokemon list: ${error}.`);
    throw new Error('Unable to get a full Pokemon list. Please try again later.');
  }
}

const getPokemonDetails = async () => {
    const url = 'https://pokeapi.co/api/v2/pokemon/squirtle';
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    console.log('get Pokemon Details:', data);
    
  } catch (error) {
    console.log(`Error fetching details about this Pokemon: ${error}.`);
    throw new Error('Unable to get details about this Pokemon. Please try again later.');
  }
}

export {getPokemons, getPokemonDetails};