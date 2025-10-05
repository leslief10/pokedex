import { ref } from 'vue';

export function useClipboard() {
  const isCopied = ref(false);

  const copyToClipboard = async (data) => {
    try {
      const text =
        typeof data === 'string' ? data : JSON.stringify(data, null, 2);

      await navigator.clipboard.writeText(text);
      isCopied.value = true;

      setTimeout(() => {
        isCopied.value = false;
      }, 2000);

      return true;
    } catch (error) {
      console.error(`Failed to copy: ${error}`);
      return false;
    }
  };

  return { copyToClipboard, isCopied };
}
