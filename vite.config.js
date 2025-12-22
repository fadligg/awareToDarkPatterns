import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            outDir: 'public',
            buildBase: '/',
            scope: '/',
            workbox: {
                cleanupOutdatedCaches: true,
                // Cache aset statis (CSS, JS, Gambar)
                globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
                
                // --- KONFIGURASI RUNTIME CACHING (UPDATE) ---
                runtimeCaching: [
                    {
                        // 1. Cache Font Google (Biar font ga ilang pas offline)
                        urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'google-fonts',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 tahun
                            },
                        },
                    },
                    {
                        // 2. Cache Navigasi Halaman & Data Inertia
                        // Menangkap request ke domain sendiri yang BUKAN file aset build
                        urlPattern: ({ url }) => url.origin === self.location.origin && !url.pathname.startsWith('/build/'),
                        handler: 'NetworkFirst', // Coba internet dulu, kalau mati baru ambil cache
                        options: {
                            cacheName: 'pages-cache',
                            expiration: {
                                maxEntries: 50, // Simpan max 50 halaman terakhir
                                maxAgeSeconds: 60 * 60 * 24 * 7, // Simpan 1 minggu
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                                headers: {
                                    'x-inertia': 'true' // Prioritaskan respon Inertia
                                }
                            }
                        }
                    }
                ]
            },
            manifest: {
                name: 'Dark Pattern Awareness',
                short_name: 'DarkPattern',
                description: 'Edukasi dan Kuis tentang Dark Pattern',
                theme_color: '#FACC15',
                icons: [
                    {
                        src: '/img/icons/icon-192x192.png', // Pastikan path ini sesuai file yang kamu buat di Langkah 2
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'any maskable'
                    },
                    {
                        src: '/img/icons/icon-512x512.png', // Pastikan path ini sesuai file yang kamu buat di Langkah 2
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable'
                    },
                    {
                        src: '/img/logo.png', // Pastikan kamu punya gambar ini di public/img/
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable'
                    }
                ]
            }
        })
    ],
});