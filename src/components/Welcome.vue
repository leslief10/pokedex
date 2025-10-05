<script setup>
import SVGIcon from './SVGIcon.vue';
import Button from './common/Button.vue';

const emit = defineEmits(['display-home']);
</script>

<template>
  <section class="flex welcome">
    <SVGIcon
      name="pikachu"
      class="welcome__hero"
    />
    <div class="flex welcome__text">
      <h1 class="welcome__text--title">Welcome to Pokédex</h1>
      <p class="welcome__text--description">
        The digital encyclopedia created by Professor Oak is an invaluable tool
        to Trainers in the Pokémon world.
      </p>
    </div>
    <Button
      variant="primary"
      @button-clicked="emit('display-home', true)"
    >
      Get started
    </Button>
  </section>
</template>

<style scoped>
.welcome {
  gap: 3.75rem;
  max-width: 35.625rem;
  height: 100%;
  padding: 4.375rem 1.625rem;
  margin: 0 auto;
}

.welcome__text {
  gap: 1.875rem;
}

.welcome__text--title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--dark-grey);
}

.home__text--description {
  font-size: 1.125rem;
  line-height: 150%;
  text-align: center;
  color: var(--medium-grey);
}
</style>
