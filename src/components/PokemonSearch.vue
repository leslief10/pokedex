<script setup>
import { storeToRefs } from 'pinia';
import { usePokemonStore } from '../stores/pokemon';
import Search from './common/Search.vue';

const emit = defineEmits(['pokemon-search']);

const pokemonStore = usePokemonStore();
const { error } = storeToRefs(pokemonStore);

const handleSearch = (value) => {
  emit('pokemon-search', {
    name: value,
    openModal: true,
  });
};
</script>

<template>
  <Search
    :error="error"
    @search="handleSearch"
  />
</template>

<style scoped>
.search-form {
  width: 100%;
  max-width: 35.625rem;
  height: 3.125rem;
  margin-bottom: 2.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.search-form__container {
  display: flex;
  position: relative;
}

.search-form__input {
  width: 100%;
  padding: 1rem 0 1rem 2.75rem;
  font-family: var(--secondary-font);
  font-size: 1rem;
  border-radius: 0.5rem;
  border: none;
  color: var(--dark-grey);
}

input[type='search']::-webkit-search-cancel-button {
  display: none;
}

.input[type='search']:focus::-webkit-search-cancel-button {
  display: block;
}

.search-form__button {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
}

.search-form__input:focus-visible {
  outline: 1px solid var(--burned-yellow);
}
</style>
