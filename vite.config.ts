/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite';
import type { IncomingMessage, ServerResponse } from 'node:http';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

function contactApiPlugin(): Plugin {
  const handler = (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    const url = req.url?.split('?')[0];
    if (
      url &&
      (url === '/kortfolio/api/contact' ||
        url === '/api/contact' ||
        url.endsWith('/api/contact') ||
        url.endsWith('/api/contact.php')) &&
      req.method === 'POST'
    ) {
      let body = '';
      req.on('data', (chunk: Buffer) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          const data = JSON.parse(body || '{}');
          if (data.website) {
            // Honeypot caught
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: true, message: 'Inquiry received. Thank you.' }));
            return;
          }
          if (
            !data.name ||
            data.name.trim().length < 2 ||
            !data.email ||
            !data.message ||
            data.message.trim().length < 20
          ) {
            res.writeHead(422, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: false, error: 'Validation failed.' }));
            return;
          }
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(
            JSON.stringify({
              ok: true,
              message:
                'Your message was sent successfully! Kondwani will review your inquiry and respond shortly.',
            }),
          );
        } catch {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: false, error: 'Invalid JSON payload.' }));
        }
      });
      return;
    }
    next();
  };

  return {
    name: 'contact-api-mock',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.stack.unshift({ route: '', handle: handler });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: '/kortfolio/',
  plugins: [
    react(),
    tailwindcss(),
    contactApiPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: null,
      includeAssets: [
        'favicon.svg',
        'apple-touch-icon.png',
        'pwa-192x192.png',
        'pwa-512x512.png',
        'pwa-maskable-512x512.png',
        'robots.txt',
        'sitemap.xml',
      ],
      manifest: {
        id: '/kortfolio/',
        name: 'KORTFOLIO — Kondwani Austin Phanga',
        short_name: 'KORTFOLIO',
        description:
          'A retro-futurist portfolio and systems lab: production software across fintech, public health, edge AI, and documentary media. Built in Malawi.',
        lang: 'en',
        theme_color: '#090d18',
        background_color: '#05070d',
        display: 'standalone',
        orientation: 'any',
        categories: ['portfolio', 'productivity', 'developer'],
        start_url: '/kortfolio/',
        scope: '/kortfolio/',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        // Precache only the app shell; large imagery is runtime-cached on demand.
        globPatterns: ['**/*.{js,css,html,svg,woff2,webmanifest}'],
        globIgnores: [
          '**/assets/photos/**',
          '**/assets/projects/**',
          '**/assets/profile/**',
          '**/assets/world-*.js',
          '**/assets/WebGLRenderer-*.js',
        ],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        navigateFallback: '/kortfolio/index.html',
        runtimeCaching: [
          {
            // Network-first navigations: never serve a stale HTML shell that
            // points at hashed chunks we no longer ship. Falls back to the
            // cached shell when offline.
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'kortfolio-pages',
              networkTimeoutSeconds: 4,
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'kortfolio-images',
              expiration: {
                maxEntries: 160,
                maxAgeSeconds: 60 * 60 * 24 * 30,
                purgeOnQuotaError: true,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-stylesheets' },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
  server: {
    port: 5173,
    host: true,
    allowedHosts: true,
  },
  preview: {
    port: 5173,
    host: true,
    allowedHosts: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
});
