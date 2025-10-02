<script setup>
import SVGIcon from './SVGIcon.vue';
</script>
  <template>
    <section class="loading-state">
      <SVGIcon name="pokeball" class="loading-state__icon" />
    </section>
  </template>

<style scoped>
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