import type { Config } from '@react-router/dev/config'
import { getPostSlugs } from './src/utils/posts.server'

export default {
  appDirectory: 'src',
  // 런타임 서버 없이 정적 파일로 배포한다. 빌드할 때 아래 경로의 HTML을 미리 만든다.
  ssr: false,
  // 소개(/), 분류별 목록, 배포할 글(draft 제외)마다 HTML을 만든다.
  // 개발 서버는 routes.ts처럼 초안도 센다. 초안만 있을 때 글 라우트가 이 목록에 안 걸리면 서버가 멈춘다.
  async prerender({ getStaticPaths }) {
    const slugs = getPostSlugs({ includeDrafts: process.env.NODE_ENV === 'development' })
    return [...getStaticPaths(), ...slugs.map((slug) => `/posts/${slug}`)]
  },
} satisfies Config
