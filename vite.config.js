import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      // No hace falta includeAssets: globPatterns ya cubre todo lo que
      // acaba en dist/, incluidos los recursos copiados desde public/.
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpeg,jpg,svg,wav,webmanifest}'],
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
      },
      manifest: {
        name: 'Diviértete con los Cuentos',
        short_name: 'Cuentos',
        description:
          'Aplicativo de comprensión lectora — Institución Educativa Integrado de Cómbita, Boyacá',
        lang: 'es',
        start_url: './',
        scope: './',
        display: 'standalone',
        orientation: 'any',
        background_color: '#0f2f4a',
        theme_color: '#0f2f4a',
        icons: [
          { src: 'icono-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icono-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icono-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
