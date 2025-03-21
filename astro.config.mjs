import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://mkit.fr',
  base: '/',
  server: {
    port: 4321,
    host: true
  },
  build: {
    assets: 'static',
    format: 'directory'
  },
  integrations: [
    tailwind({
      // Configure tailwind to not apply base styles that might conflict with existing CSS
      config: { 
        applyBaseStyles: false 
      }
    }),
    react()
  ],
  vite: {
    ssr: {
      noExternal: ['astro']
    },
    optimizeDeps: {
      exclude: []
    },
    build: {
      sourcemap: true,
      minify: false
    }
  },
  trailingSlash: 'always'
});
