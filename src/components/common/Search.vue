<script setup>
import { ref } from 'vue';
import Button from './Button.vue';
import SVGIcon from '../SVGIcon.vue';

const searchQuery = ref('');

const emit = defineEmits(['search']);

defineProps({
  error: {
    type: String,
    default: 'Error',
  },
});

const handleSubmit = (e) => {
  e.preventDefault();
  emit('search', searchQuery.value);
};
</script>

<template>
  <form @submit="handleSubmit">
    <div class="flex search-form">
      <div class="search-form__container">
        <label for="search"></label>
        <input
          id="search"
          v-model="searchQuery"
          autocomplete="off"
          type="search"
          spellcheck="false"
          placeholder="Search"
          class="search-form__input"
          aria-label="Search Pokemon"
        />
        <Button
          type="submit"
          variant="secondary"
          class="search-form__button"
        >
          <SVGIcon name="search-icon" />
        </Button>
      </div>
      <span class="search-form__error">{{ error }}</span>
    </div>
  </form>
</template>

<style scoped>
.search-form {
  gap: 0.5rem;
  width: 100%;
  max-width: 35.625rem;
  margin-bottom: 2.5rem;
}

.search-form__container {
  display: flex;
  position: relative;
  width: 100%;
  height: 3.125rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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

.search-form__error {
  align-self: flex-start;
  padding-inline: 0.5rem;
  font-size: 0.75rem;
  color: var(--dark-red);
}
</style>
