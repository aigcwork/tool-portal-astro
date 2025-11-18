import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  build: {
    format: 'directory'
  },
  vite: {
    define: {
      'import.meta.env.ENABLE_ADMIN': JSON.stringify(process.env.ENABLE_ADMIN || 'true'),
      'import.meta.env.ADMIN_PASSWORD': JSON.stringify(process.env.ADMIN_PASSWORD || ''),
    }
  }
});