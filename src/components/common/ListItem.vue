<script setup>
import Button from './Button.vue';
import SVGIcon from '../SVGIcon.vue';

const emit = defineEmits(['toggle-favorite', 'open-modal']);

defineProps({
  item: {
    type: String,
    default: '',
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="flex list-item">
    <Button
      variant="secondary"
      class="list-item__button"
      @button-clicked="emit('open-modal')"
    >
      {{ item }}
    </Button>
    <Button
      variant="icon"
      @button-clicked="emit('toggle-favorite')"
    >
      <SVGIcon
        name="star-icon"
        :class="{ favorite: isFavorite }"
      />
    </Button>
  </div>
</template>

<style scoped>
.list-item {
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem 0.625rem 1rem 1.25rem;
  border-radius: 0.75rem;
  background-color: var(--white);
}

.list-item__button {
  font-size: 1.375rem;
  text-transform: capitalize;
  color: var(--dark-grey);
}

.favorite {
  color: var(--burned-yellow);
}
</style>
