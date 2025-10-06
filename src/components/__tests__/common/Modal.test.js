import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Modal from '../../common/Modal.vue';

describe('Modal', () => {
  it('should render with slot content', () => {
    const wrapper = mount(Modal, {
      slots: {
        header: '<div>Header</div>',
        default: '<div>Content</div>',
        footer: '<div>Footer</div>',
      },
    });

    expect(wrapper.find('header').text()).toBe('Header');
    expect(wrapper.find('main').text()).toBe('Content');
    expect(wrapper.find('footer').text()).toBe('Footer');
  });

  it('should have correct layout classes', () => {
    const wrapper = mount(Modal);

    expect(wrapper.find('.overlay').exists()).toBe(true);
    expect(wrapper.find('.modal').exists()).toBe(true);
    expect(wrapper.classes('flex')).toBe(true);
  });
});
