import type { Config } from 'tailwindcss'

export default {
  content: [
    './entrypoints/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
} satisfies Config
