import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Welcome from '../Welcome.vue';

describe('Welcome', () => {
  it('should render welcome screen with correct content', () => {
    const wrapper = mount(Welcome);

    expect(wrapper.find('h1').text()).toBe('Welcome to Pokédex');
    expect(wrapper.find('p').text()).toContain('Professor Oak');
    expect(wrapper.findComponent({ name: 'SVGIcon' }).props('name')).toBe(
      'pikachu',
    );
  });

  it('should emit display-home event when button is clicked', async () => {
    const wrapper = mount(Welcome);
    const button = wrapper.findComponent({ name: 'Button' });

    await button.vm.$emit('button-clicked');

    expect(wrapper.emitted('display-home')).toBeTruthy();
    expect(wrapper.emitted('display-home')[0]).toEqual([true]);
  });

  it('should have correct button text', () => {
    const wrapper = mount(Welcome);
    const button = wrapper.findComponent({ name: 'Button' });

    expect(button.text()).toBe('Get started');
  });

  it('should apply correct CSS classes for layout', () => {
    const wrapper = mount(Welcome);

    expect(wrapper.classes()).toContain('welcome');
    expect(wrapper.classes()).toContain('flex');
    expect(wrapper.find('.welcome__text').classes()).toContain('flex');
  });

  it('should pass correct props to SVGIcon', () => {
    const wrapper = mount(Welcome);
    const icon = wrapper.findComponent({ name: 'SVGIcon' });

    expect(icon.props('name')).toBe('pikachu');
    expect(icon.classes()).toContain('welcome__hero');
  });
});
