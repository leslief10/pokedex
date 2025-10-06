import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useClipboard } from '../useClipboard';

describe('useClipboard', () => {
  let mockClipboard;

  beforeEach(() => {
    vi.useFakeTimers();
    mockClipboard = {
      writeText: vi.fn().mockResolvedValue(undefined),
    };
    Object.defineProperty(navigator, 'clipboard', {
      value: mockClipboard,
      writable: true,
    });
  });

  it('should copy string data to clipboard', async () => {
    const testString = 'test data';
    const { copyToClipboard, isCopied } = useClipboard();

    const result = await copyToClipboard(testString);

    expect(result).toBe(true);
    expect(mockClipboard.writeText).toHaveBeenCalledWith(testString);
    expect(isCopied.value).toBe(true);

    vi.advanceTimersByTime(2000);
    expect(isCopied.value).toBe(false);
  });

  it('should copy object data to clipboard as JSON', async () => {
    const testObject = { key: 'value' };
    const { copyToClipboard } = useClipboard();

    await copyToClipboard(testObject);

    expect(mockClipboard.writeText).toHaveBeenCalledWith(
      JSON.stringify(testObject, null, 2),
    );
  });

  it('should handle clipboard errors', async () => {
    const consoleSpy = vi.spyOn(console, 'error');

    mockClipboard.writeText = vi
      .fn()
      .mockRejectedValue(new Error('Clipboard error'));

    const { copyToClipboard, isCopied } = useClipboard();

    const result = await copyToClipboard('test');

    expect(result).toBe(false);
    expect(isCopied.value).toBe(false);
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Failed to copy'),
    );
  });

  it('should reset isCopied after timeout', async () => {
    const { copyToClipboard, isCopied } = useClipboard();

    await copyToClipboard('test');
    expect(isCopied.value).toBe(true);

    vi.advanceTimersByTime(1000);
    expect(isCopied.value).toBe(true);

    vi.advanceTimersByTime(1000);
    expect(isCopied.value).toBe(false);
  });
});
