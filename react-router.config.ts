import type { Config } from '@react-router/dev/config'
import { getPostSlugs } from './src/utils/posts.server'

export default {
  appDirectory: 'src',
  // 런타임 서버 없이 정적 파일로 배포한다. 빌드할 때 아래 경로의 HTML을 미리 만든다.
  ssr: false,
  // 소개(/), 분류별 목록, 배포할 글(draft 제외)마다 HTML을 만든다.
  async prerender({ getStaticPaths }) {
    return [...getStaticPaths(), ...getPostSlugs().map((slug) => `/posts/${slug}`)]
  },
} satisfies Config
