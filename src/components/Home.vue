<script setup>
import SVGIcon from './SVGIcon.vue';
import Button from './Button.vue';
</script>

<template>
  <section class="flex home">
    <SVGIcon name="pikachu" class="home__hero" />
    <div class="flex home__text">
      <h1 class="home__text--title">Welcome to Pokédex</h1>
      <p class="home__text--description">The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.</p>
    </div>
    <Button variant="primary">
      Get started
    </Button> 
  </section>
</template>

<style scoped>
.home {
  gap: 3.75rem;
  max-width: 35.625rem;
  height: 100%;
  padding: 4.375rem 1.625rem;
}

.home__text {
  gap: 1.875rem;
}

.home__text--title {
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