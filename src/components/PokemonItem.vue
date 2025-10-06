<script setup>
import { computed } from 'vue';
import { useFavoritesStore } from '../stores/favorites';
import ListItem from './common/ListItem.vue';

const emit = defineEmits(['open-modal']);

const favoritesStore = useFavoritesStore();
const { toggleFavorite, isFavorite } = favoritesStore;

const props = defineProps({
  name: {
    type: String,
    default: 'Pikachu',
  },
});

const handleOpenModal = () => {
  emit('open-modal', {
    name: props.name,
    openModal: true,
  });
};

const handleToggleFavorite = () => {
  toggleFavorite(props.name);
};

const handleIsFavorite = computed(() => isFavorite(props.name));
</script>

<template>
  <ListItem
    :item="name"
    :is-favorite="handleIsFavorite"
    @open-modal="handleOpenModal"
    @toggle-favorite="handleToggleFavorite"
  />
</template>

<style scoped></style>
