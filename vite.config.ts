import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { reactRouter } from '@react-router/dev/vite'

export default defineConfig({
  // 테스트는 컴포넌트 단위라 React Router 플러그인 없이 React 플러그인만 쓴다.
  plugins: [process.env.VITEST ? react() : reactRouter()],

  // 빌드 때 HTML을 미리 만드는 서버 렌더에서 lottie-react는 Node가 CommonJS 빌드(main)를 읽어
  // default import가 컴포넌트가 아닌 모듈 객체가 된다. 서버 번들에 포함시켜 Vite가 변환하게 한다.
  ssr: {
    noExternal: ['lottie-react'],
  },

  // 무거운 벤더 라이브러리를 개별 청크로 분리해 브라우저 캐싱을 개선한다.
  // 서버 번들에서는 react가 외부 모듈이라 나눌 수 없으므로 클라이언트 빌드에만 적용한다.
  environments: {
    client: {
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              react: ['react', 'react-dom'],
              'framer-motion': ['framer-motion'],
              lottie: ['lottie-react'],
            },
          },
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
