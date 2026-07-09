import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    rollupOptions: {
      output: {
        // 무거운 벤더 라이브러리를 개별 청크로 분리해 브라우저 캐싱을 개선한다.
        manualChunks: {
          react: ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
          lottie: ['lottie-react'],
        },
      },
    },
  },

  test: {
    globals: true, // 'describe', 'it' 등을 import 없이 사용
    environment: 'jsdom', 
    setupFiles: './src/tests/setup.ts', 
    css: true,
  },
})