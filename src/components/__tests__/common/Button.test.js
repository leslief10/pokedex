import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from '../../common/Button.vue';

describe('Button', () => {
  it('should render with default variant', () => {
    const wrapper = mount(Button);

    expect(wrapper.classes()).toContain('primary');
  });

  it('should render with specified variant', () => {
    const wrapper = mount(Button, {
      props: { variant: 'secondary' },
    });

    expect(wrapper.classes()).toContain('secondary');
  });

  it('should emit button-clicked event when clicked', async () => {
    const wrapper = mount(Button);

    await wrapper.trigger('click');

    expect(wrapper.emitted('button-clicked')).toBeTruthy();
  });

  it('should render slot content', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Test Button',
      },
    });

    expect(wrapper.text()).toBe('Test Button');
  });
});
