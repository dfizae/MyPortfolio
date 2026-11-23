import { MESSAGE } from './Text'

// 글 분류. id는 md frontmatter의 category 값, path는 분류별 목록 주소.
export const POST_CATEGORIES = [
  { id: 'retrospect', path: '/retrospect', label: MESSAGE.POST_CATEGORY_RETROSPECT },
  { id: 'thoughts', path: '/thoughts', label: MESSAGE.POST_CATEGORY_THOUGHTS },
  { id: 'study', path: '/study', label: MESSAGE.POST_CATEGORY_STUDY },
] as const

export type PostCategory = (typeof POST_CATEGORIES)[number]['id']

export const POST_CATEGORY_IDS: readonly string[] = POST_CATEGORIES.map((c) => c.id)

export function getCategory(id: PostCategory) {
  return POST_CATEGORIES.find((c) => c.id === id) ?? POST_CATEGORIES[0]
}

// 홈의 글 섹션: 대표 글(pinned: true)은 최근 날짜 순으로 3편까지, 그 아래 최근 글은 대표 글을 뺀 5편까지.
export const PINNED_POST_COUNT = 3
export const RECENT_POST_COUNT = 5

// 글 화면에 넘기는 값. 본문 HTML은 빌드 때 만든다(md 파서는 브라우저로 보내지 않는다).
export type PostSummary = {
  slug: string
  title: string
  date: string // YYYY-MM-DD
  category: PostCategory
  summary: string
  pinned: boolean
}

export type Post = PostSummary & { html: string }
