import { type RouteConfig, index, route } from '@react-router/dev/routes'
import { POST_CATEGORIES } from './constants/Posts'
import { getPostSlugs } from './utils/posts.server'

// 글 주소(/posts/:slug)는 글이 하나라도 있을 때만 만든다. ssr: false 빌드에서는 loader가 있는 라우트가
// 미리 만드는 경로에 하나도 걸리지 않으면 빌드가 멈추기 때문이다. 개발 서버에서는 초안(draft)도 센다.
const hasPosts = getPostSlugs({ includeDrafts: process.env.NODE_ENV === 'development' }).length > 0

export default [
  index('routes/home.tsx'),
  ...(hasPosts ? [route('posts/:slug', 'routes/post.tsx')] : []),
  // 분류별 목록은 같은 모듈을 주소만 바꿔 쓴다 (/study, /retrospect, /algorithm)
  ...POST_CATEGORIES.map((c) => route(c.path.slice(1), 'routes/category.tsx', { id: `category-${c.id}` })),
] satisfies RouteConfig
