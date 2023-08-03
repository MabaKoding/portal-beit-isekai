import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue2 from '@vitejs/plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      vue2(),
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      })
    ],
    server: {
      proxy: {
        '/api/classroom': {
          target: env.VITE_APP_API,
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace('/api/classroom', ''),
        }
      }
    },
    define: {
      'process.env': {}
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
