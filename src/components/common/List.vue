<script setup>
const emit = defineEmits(['toggle-favorite', 'open-modal']);

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  itemComponent: {
    type: Object,
    required: true,
  },
  keyProperty: {
    type: String,
    default: 'id',
  },
});
</script>

<template>
  <ul class="list">
    <li
      v-for="item in items"
      :key="item[keyProperty]"
      class="list__element"
    >
      <component
        :is="itemComponent"
        v-bind="item"
        @open-modal="emit('open-modal', $event)"
        @toggle-favorite="emit('toggle-favorite', $event)"
      />
    </li>
  </ul>
</template>

<style scoped>
.list {
  width: 100%;
}

.list__element:not(:last-child) {
  margin-bottom: 0.625rem;
}
</style>
