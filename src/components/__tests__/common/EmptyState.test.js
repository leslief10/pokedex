import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import EmptyState from '../../common/EmptyState.vue';

describe('EmptyState', () => {
  const defaultProps = {
    title: 'Test Title',
    message: 'Test Message',
    showButton: true,
    buttonText: 'Test Button',
  };

  it('should render with provided props', () => {
    const wrapper = mount(EmptyState, { props: defaultProps });

    expect(wrapper.find('.empty-state__title').text()).toBe('Test Title');
    expect(wrapper.find('.empty-state__message').text()).toBe('Test Message');
    expect(wrapper.findComponent({ name: 'Button' }).text()).toBe(
      'Test Button',
    );
  });

  it('should not render button when showButton is false', () => {
    const wrapper = mount(EmptyState, {
      props: { ...defaultProps, showButton: false },
    });

    expect(wrapper.findComponent({ name: 'Button' }).exists()).toBe(false);
  });

  it('should emit button-clicked event when button is clicked', async () => {
    const wrapper = mount(EmptyState, { props: defaultProps });

    await wrapper.findComponent({ name: 'Button' }).vm.$emit('button-clicked');

    expect(wrapper.emitted('button-clicked')).toBeTruthy();
  });
});
