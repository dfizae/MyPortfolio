import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  test: {
    globals: true, // 'describe', 'it' 등을 import 없이 사용
    environment: 'jsdom', 
    setupFiles: './src/tests/setup.ts', 
    css: true,
  },
})