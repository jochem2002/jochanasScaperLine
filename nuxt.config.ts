export default defineNuxtConfig({
  server: {
    port: 3030
  },

  css: [],

  modules: [
    '@nuxthq/ui',
    '@vite-pwa/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts'
  ],

  googleFonts: {
    families: {
      Outfit: [400, 600, 700]
    },
    display: 'swap'
  },

  ui: {
    icons: 'lucide'
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Aquarium Voedingsschema',
      short_name: 'Voedingsschema',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/',
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  },

  app: {
    head: {
      title: 'Aquarium Feeding Schedule',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }]
    }
  },

  compatibilityDate: '2025-05-12'
})