import { DirectiveBinding, nextTick } from 'vue'

const formatValue = (value: number): string => {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const parseValue = (value: string): number => {
  return parseFloat(value.replace(/\./g, '').replace(',', '.')) || 0;
};

export const vFormatInput = {
  mounted(el: HTMLElement, binding: DirectiveBinding<number>) {
    const input = el.tagName === 'INPUT' ? el as HTMLInputElement : el.querySelector('input')

    if (!input || !(input instanceof HTMLInputElement)) {
      console.warn('v-currency directive requires an input element')
      return
    }

    let timeout: ReturnType<typeof setTimeout> | null = null;

    const updateValue = () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        const numericValue = parseValue(input.value)
        const formattedValue = formatValue(numericValue)
        if (input.value !== formattedValue) {
          input.value = formattedValue
          input.dispatchEvent(new Event('input', { bubbles: true }))
        }
      }, 0);
    }

    input.addEventListener('input', updateValue)
    input.addEventListener('blur', updateValue)

    // Initial formatting
    nextTick(() => {
      if (binding.value !== undefined) {
        input.value = formatValue(binding.value)
      }
    })
  }
}
