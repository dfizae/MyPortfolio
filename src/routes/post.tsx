import { data, useLoaderData, type LoaderFunctionArgs, type MetaArgs, type MetaDescriptor } from 'react-router'
import { getPost } from '../utils/posts.server'
import PostArticle from '../pages/blog/PostArticle'
import { MESSAGE } from '../constants/Text'
import { LINK } from '../constants/HyperLink'

// 이 라우트는 글이 있을 때만 routes.ts에 들어가서, 글이 없으면 타입 생성(./+types/post)이 만들어지지 않는다.
// 그래서 생성 타입 대신 react-router의 타입을 직접 쓴다.
export async function loader({ params }: LoaderFunctionArgs) {
  const post = await getPost(params.slug ?? '', { includeDrafts: import.meta.env.DEV })
  if (!post) throw data(null, { status: 404 })
  return post
}

export function meta({ loaderData }: MetaArgs<typeof loader>): MetaDescriptor[] {
  if (!loaderData) return [{ title: MESSAGE.META_TITLE }]
  const title = `${loaderData.title} | ${MESSAGE.META_NAME}`
  return [
    { title },
    { name: 'description', content: loaderData.summary },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: loaderData.summary },
    { property: 'og:url', content: new URL(`posts/${loaderData.slug}`, LINK.LINK_SITE).href },
    { property: 'og:locale', content: 'ko_KR' },
  ]
}

export default function PostRoute() {
  return <PostArticle post={useLoaderData<typeof loader>()} />
}
