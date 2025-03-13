import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://ai-solutions.com',
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
    })
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
