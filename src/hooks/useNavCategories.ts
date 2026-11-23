import { useRouteLoaderData } from 'react-router'
import type { loader as rootLoader } from '../root'
import { POST_CATEGORIES } from '../constants/Posts'

export type NavCategory = { path: string; label: string }

// 루트 loader가 정한 분류만 위쪽 메뉴용 { path, label }로 돌려준다.
export default function useNavCategories(): NavCategory[] {
  const ids: readonly string[] = useRouteLoaderData<typeof rootLoader>('root')?.navCategoryIds ?? []
  return POST_CATEGORIES.filter((c) => ids.includes(c.id)).map((c) => ({ path: c.path, label: c.navLabel }))
}
