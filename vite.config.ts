import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto', // Inietta automaticamente lo script del Service Worker
      devOptions: {
        enabled: true,
        navigateFallback: 'index.html', // Evita che le rotte inesistenti diano errore
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Secret Santa Wishlist',
        short_name: 'SantaList',
        description: 'Organizza e prenota i regali di Natale con i tuoi amici',
        theme_color: '#dc2626', // Il rosso primary che abbiamo usato
        background_color: '#ffffff',
        display: 'standalone', // Questo rimuove la barra del browser (come YT)
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable' 
          }
        ]
      }
    })
  ]
})