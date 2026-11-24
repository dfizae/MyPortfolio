import { data } from 'react-router'
import type { Route } from './+types/category'
import { getPostSummaries } from '../utils/posts.server'
import { POST_CATEGORIES, getCategory } from '../constants/Posts'
import CategoryPage from '../pages/blog/CategoryPage'
import { MESSAGE } from '../constants/Text'
import { LINK } from '../constants/HyperLink'

// 같은 모듈을 /study, /retrospect, /algorithm 세 주소에 쓰므로 주소로 분류를 고른다.
export async function loader({ request }: Route.LoaderArgs) {
  const pathname = new URL(request.url).pathname.replace(/\.data$/, '').replace(/\/$/, '')
  const category = POST_CATEGORIES.find((c) => c.path === pathname)
  if (!category) throw data(null, { status: 404 })
  const posts = getPostSummaries({ includeDrafts: import.meta.env.DEV }).filter((p) => p.category === category.id)
  return { categoryId: category.id, posts }
}

export function meta({ loaderData }: Route.MetaArgs): Route.MetaDescriptors {
  if (!loaderData) return [{ title: MESSAGE.META_TITLE }]
  const category = getCategory(loaderData.categoryId)
  const title = `${category.label} | ${MESSAGE.META_NAME}`
  return [
    { title },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:url', content: new URL(category.path.slice(1), LINK.LINK_SITE).href },
    { property: 'og:locale', content: 'ko_KR' },
  ]
}

export default function CategoryRoute({ loaderData }: Route.ComponentProps) {
  return <CategoryPage label={getCategory(loaderData.categoryId).label} posts={loaderData.posts} />
}
