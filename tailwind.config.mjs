/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#3a7bd5',
        secondary: '#00d2ff',
      },
    },
  },
  plugins: [],
  // Important: This ensures Tailwind doesn't override your existing styles
  corePlugins: {
    preflight: false,
  },
}
