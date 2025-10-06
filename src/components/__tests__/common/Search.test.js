import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Search from '../../common/Search.vue';

describe('Search', () => {
  it('should emit search event with input value on submit', async () => {
    const wrapper = mount(Search);
    const input = wrapper.find('input[type="search"]');

    await input.setValue('pikachu');
    await wrapper.find('form').trigger('submit');

    expect(wrapper.emitted('search')).toBeTruthy();
    expect(wrapper.emitted('search')[0]).toEqual(['pikachu']);
  });

  it('should display error message when provided', () => {
    const wrapper = mount(Search, {
      props: {
        error: 'Pokemon not found',
      },
    });

    expect(wrapper.find('.search-form__error').text()).toBe(
      'Pokemon not found',
    );
  });

  it('should update searchQuery on input', async () => {
    const wrapper = mount(Search);
    const input = wrapper.find('input[type="search"]');

    await input.setValue('pikachu');

    expect(wrapper.vm.searchQuery).toBe('pikachu');
  });
});
