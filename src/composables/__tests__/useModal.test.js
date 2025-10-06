import { describe, it, expect } from 'vitest';
import { useModal } from '../useModal';

describe('useModal', () => {
  it('should change the value of isOpen depending on which function is called', () => {
    const { isOpen, open, close } = useModal();

    open();

    expect(isOpen.value).toBe(true);

    close();

    expect(isOpen.value).toBe(false);
  });
});
