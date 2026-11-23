import type { Config } from '@react-router/dev/config'

export default {
  appDirectory: 'src',
  // 런타임 서버 없이 정적 파일로 배포한다. 빌드할 때 아래 경로의 HTML을 미리 만든다.
  ssr: false,
  prerender: ['/'],
} satisfies Config
