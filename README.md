# Pokédex

## Overview

This project is a digital Pokédex that allows users to browse, search, and learn about different Pokémon species. It provides information about each Pokémon, like their weight, height and type. It also allows users to copy a Pokémon's name and abilities to a browser's clipboard and to save their favorites Pokémons in a separate list.

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [Technologies](#technologies)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Why I did some of the things I did](#why-i-did-some-of-the-things-i-did)

## Features

- Search Pokémon by name.
- Detailed view of Pokémon characteristics.
- Copy a Pokémon's name and abilities to a browser's clipboard.
- Save favorite Pokémons to a favorites list.
- Responsive design for desktop and mobile devices.

## Installation

```bash
# Clone the repository
git clone https://github.com/leslief10/pokedex.git

# Navigate to project directory
cd pokedex

# Install dependencies
npm install
```

## Usage

```bash
# Run development server
npm run dev

# Build for production
npm run build
```

## Technologies

- Vue
- Vite
- Vitest
- Pinia
- Vite-SVG-Loader

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Project Structure

```
src/
├── assets/
├── components/
│   ├── common/
│   └── views/
├── composables/
├── services/
└── stores/
```

## Why I did some of the things I did

So, in previous projects I'd noticed that Vite and SVGs don't work well so I decided to import the SVGs as components [here's an article focused on Vite + Vue](https://dev.to/geowrgetudor/dealing-with-svg-icons-in-vue-vite-an9). I installed vite-svg-loader as a dependency and created a dynamic component so it would load the SVG I need. I also went with a dynamic component in `List.vue` and `PokemonExplorer.vue`; in `List.vue` it was because I wanted it to be as generic as possible for a common component and for `PokemonExplorer.vue`, I wanted to tab between lists without having to mount/unmount. It also makes the code a bit more readable.

I knew that I would need to implement Pinia so I would have a global store for `FavPokemonList.vue`, but I also created one for `PokemonList.vue`, so I would have a centralized data management and to make it easier to shate data, loading and error states between the components without having to worry about component hierarchy.

The main Pokemon API is paginated (because apparently now there are more than 1300 Pokemons, which is insane, because I remember when there were only 150), so I implemented infinited scrolling so if someone wants to see the full list, they can :).
