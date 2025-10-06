<script setup>
import SVGIcon from './common/SVGIcon.vue';
</script>
<template>
  <div class="flex loading-state">
    <SVGIcon
      name="pokeball"
      class="loading-state__icon"
    />
  </div>
</template>

<style scoped>
.loading-state {
  min-height: inherit;
}

.loading-state__icon {
  color: var(--black);
  animation: spin 3s infinite alternate;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
