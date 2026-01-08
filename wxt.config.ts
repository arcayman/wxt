import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite'

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    permissions: ['sidePanel','storage'], // Required for Chrome
    action: {}, // Required for the side panel to open on icon click
  },
    vite: () => ({
    plugins: [tailwindcss()],
  })
});
