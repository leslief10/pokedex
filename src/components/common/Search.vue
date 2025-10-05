<script setup>
import { ref } from 'vue';
import Button from './Button.vue';
import SVGIcon from '../SVGIcon.vue';

const searchQuery = ref('');
const emit = defineEmits(['search']);

const handleSubmit = (e) => {
  e.preventDefault();
  emit('search', searchQuery.value);
};
</script>

<template>
  <form
    class="search-form"
    @submit="handleSubmit"
  >
    <div class="search-form__container">
      <label for="search"></label>
      <input
        id="search"
        v-model="searchQuery"
        autocomplete="off"
        type="search"
        placeholder="Search"
        class="search-form__input"
        aria-label="Search Pokémon"
      />
      <Button
        type="submit"
        variant="secondary"
        class="search-form__button"
      >
        <SVGIcon name="search-icon" />
      </Button>
    </div>
  </form>
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

.search-form__input::-webkit-search-cancel-button {
  display: hidden;
}

.search-form__button {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
}
</style>
