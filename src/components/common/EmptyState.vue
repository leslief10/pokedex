<script setup>
import Button from './Button.vue';

defineProps({
  title: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '',
  },
  showButton: {
    type: Boolean,
    default: false,
  },
  buttonText: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['button-clicked']);
</script>

<template>
  <div class="flex empty-state">
    <h1 class="empty-state__title">{{ title }}</h1>
    <p class="empty-state__message">{{ message }}</p>
    <Button
      v-if="showButton"
      variant="primary"
      @button-clicked="emit('button-clicked')"
    >
      {{ buttonText }}
    </Button>
  </div>
</template>

<style scoped>
.empty-state {
  gap: 0.625rem;
  max-width: 35.625rem;
  padding-top: 0.625rem;
}

.empty-state__title {
  font-size: 2.25rem;
  color: var(--dark-grey);
}

.empty-state__message {
  margin-bottom: 1rem;
  font-size: 1.25rem;
  text-align: center;
  color: var(--medium-grey);
}
</style>
