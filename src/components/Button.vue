<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
  disabled: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(['button-clicked']);
</script>

<template>
  <button
    class="button"
    :class="variant"
    :disabled="disabled"
    @click="emit('button-clicked', $event)"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--main-font);
  border: none;
}

.primary {
  min-width: 8.125rem;
  height: 2.75rem;
  padding: 1.375rem 0.75rem;
  font-size: 1.125rem;
  font-weight: 700;
  border-radius: 1.25rem;
  background-color: var(--cherry-red);
  color: var(--white);
}

.icon {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background-color: var(--lightest-grey);
}

.button:disabled {
  background-color: var(--light-grey);
  color: var(--white);
}


@media (hover: hover) {
  .button:hover {
    cursor: pointer;
  }

  .primary:hover {
    background-color: var(--dark-red);
  }

  .icon:hover {
    background-color: var(--lighter-grey);
  }

  .button:disabled:hover {
    background-color: var(--medium-grey);
  }
}
</style>