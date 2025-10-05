<script setup></script>

<template>
  <div class="flex overlay">
    <div class="modal">
      <header>
        <slot name="header"></slot>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.modal {
  background: white;
  border-radius: 0.5rem;
  max-width: 35.625rem;
  width: 90%;
}
</style>
