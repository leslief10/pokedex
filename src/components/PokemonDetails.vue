<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { usePokemonStore } from '../stores/pokemon';
import { useFavoritesStore } from '../stores/favorites';
import { useClipboard } from '../composables/useClipboard';
import Modal from './common/Modal.vue';
import Button from './common/Button.vue';
import SVGIcon from './common/SVGIcon.vue';

const emit = defineEmits(['close-modal']);

const pokemonStore = usePokemonStore();
const favoritesStore = useFavoritesStore();
const { pokemonDetails } = storeToRefs(pokemonStore);
const { toggleFavorite, isFavorite } = favoritesStore;
const { copyToClipboard } = useClipboard();

const handleCopy = () => {
  const pokemonData = {
    name: pokemonDetails.value.name,
    abilities: pokemonDetails.value.abilities.map(
      (ability) => ability.ability.name,
    ),
  };

  copyToClipboard(pokemonData);
};

const handleToggleFavorite = () => {
  toggleFavorite(pokemonDetails.value.name);
};

const handleIsFavorite = computed(() => isFavorite(pokemonDetails.value.name));
</script>

<template>
  <Modal>
    <template #header>
      <div class="flex pokemon-details__header">
        <Button
          variant="secondary"
          class="pokemon-details__close-button"
          data-testid="close-button"
          @button-clicked="emit('close-modal', false)"
        >
          <SVGIcon
            name="close-icon"
            class="pokemon-details__close-button--svg"
          />
        </Button>
        <figure>
          <img
            :src="
              pokemonDetails?.sprites?.other['official-artwork']?.front_default
            "
            :alt="pokemonDetails?.name"
            class="pokemon-details__img"
          />
        </figure>
      </div>
    </template>
    <template #default>
      <div class="flex pokemon-details__main">
        <p class="pokemon-details__content">
          Name: <span>{{ pokemonDetails?.name }}</span>
        </p>
        <p class="pokemon-details__content">
          Weight: <span>{{ pokemonDetails?.weight }}</span>
        </p>
        <p class="pokemon-details__content">
          Height: <span>{{ pokemonDetails?.height }}</span>
        </p>
        <p class="pokemon-details__content">
          Types:
          <span>{{
            pokemonDetails?.types?.map((type) => type.type.name).join(', ')
          }}</span>
        </p>
      </div>
    </template>
    <template #footer>
      <div class="flex pokemon-details__footer">
        <Button
          variant="primary"
          data-testid="share-button"
          @button-clicked="handleCopy"
          >Share to my friends</Button
        >
        <Button
          variant="icon"
          data-testid="toggle-fav-button"
          @button-clicked="handleToggleFavorite"
        >
          <SVGIcon
            name="star-icon"
            :class="{ favorite: handleIsFavorite }"
          />
        </Button>
      </div>
    </template>
  </Modal>
</template>

<style scoped>
.pokemon-details__header {
  position: relative;
  height: 13.75rem;
  background: no-repeat center url('../assets/pokemon-background.svg');
  border-radius: 0.5rem 0.5rem 0 0;
}

.pokemon-details__close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  border-radius: 50%;
}

.pokemon-details__close-button--svg {
  color: var(--white);
}

.pokemon-details__img {
  max-width: 11.25rem;
  max-height: 11.25rem;
}

.pokemon-details__main {
  align-items: flex-start;
  padding: 1.25rem 1.875rem;
}

.pokemon-details__content {
  display: inline-block;
  width: 100%;
  padding-block: 0.75rem;
  font-size: 1.125rem;
  font-weight: 700;
  border-bottom: 1px solid var(--lighter-grey);
  color: var(--medium-grey);

  span {
    font-weight: 400;
    text-transform: capitalize;
  }
}

.pokemon-details__footer {
  flex-direction: row;
  justify-content: space-between;
  padding: 0 1.875rem 1.25rem;
}

.favorite {
  color: var(--burned-yellow);
}
</style>
