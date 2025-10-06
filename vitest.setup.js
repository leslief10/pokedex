import { afterEach, vi, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/vue';
import { config } from '@vue/test-utils';
import '@testing-library/jest-dom';

config.global.stubs = {
  SVGIcon: {
    name: 'SVGIcon',
    props: ['name'],
    template: '<svg :data-icon-name="name" :class="$attrs.class" />',
  },
};

beforeAll(() => {
  Object.defineProperty(window, 'fetch', {
    value: vi.fn(),
    writable: true,
  });
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
