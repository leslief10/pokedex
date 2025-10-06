<script setup>
import { ref } from 'vue';
import Button from './common/Button.vue';
import SVGIcon from './common/SVGIcon.vue';

const emit = defineEmits(['toggle-view']);
const activeView = ref('PokemonList');

const handleViewChange = (view) => {
  activeView.value = view;
  emit('toggle-view', view);
};

</script>

<template>
  <div class="flex button-bar">
    <Button
      variant="primary"
      class="button-bar__button"
      :class="[activeView !== 'PokemonList' ? 'inactive' : '']"
      @button-clicked="handleViewChange('PokemonList')"
    >
      <SVGIcon name="list-icon" />
      All
    </Button>
    <Button
      variant="primary"
      class="button-bar__button"
      :class="[activeView !== 'FavPokemonList' ? 'inactive' : '']"
      @button-clicked="handleViewChange('FavPokemonList')"
    >
      <SVGIcon
        name="star-icon"
        class="button-bar__star-icon"
      />
      Favorites
    </Button>
  </div>
</template>

<style scoped>
.button-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  flex-direction: row;
  gap: 1rem;
  height: 5rem;
  background-color: var(--white);
}

.button-bar__star-icon {
  transform: scale(0.85);
}

@media screen and (min-width: 768px) {
  .button-bar__button {
    width: 17.25rem;
  }
}
</style>
