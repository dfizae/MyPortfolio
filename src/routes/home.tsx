import type { Route } from './+types/home'
import App from '../App'
import { MESSAGE } from '../constants/Text'
import { LINK } from '../constants/HyperLink'
import { PINNED_POST_COUNT, RECENT_POST_COUNT } from '../constants/Posts'
import { getPostSummaries } from '../utils/posts.server'

export async function loader() {
  const posts = getPostSummaries({ includeDrafts: import.meta.env.DEV })
  const pinned = posts.filter((p) => p.pinned).slice(0, PINNED_POST_COUNT)
  const recent = posts.filter((p) => !pinned.includes(p)).slice(0, RECENT_POST_COUNT)
  return { pinned, recent }
}

export function meta(): Route.MetaDescriptors {
  return [
    { title: MESSAGE.META_TITLE },
    { name: 'description', content: MESSAGE.META_DESCRIPTION },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: MESSAGE.META_TITLE },
    { property: 'og:description', content: MESSAGE.META_DESCRIPTION },
    { property: 'og:url', content: LINK.LINK_SITE },
    { property: 'og:locale', content: 'ko_KR' },
  ]
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <App pinnedPosts={loaderData.pinned} recentPosts={loaderData.recent} />
}
