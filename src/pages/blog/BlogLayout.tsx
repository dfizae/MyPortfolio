import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { MESSAGE } from '../../constants/Text'
import Gnb from '../../components/common/Gnb'
import useNavCategories from '../../hooks/useNavCategories'

// 글 목록과 글 상세가 함께 쓰는 틀 (DESIGN.md §3.3). 모바일 좌우 여백은 한쪽 16px, md 이상은 48px.
// width="article"이면 본문 칸(65ch) 너비로 가운데에 둔다. 65ch는 글자 크기 기준이라 본문과 같은 크기를 준다.
export default function BlogLayout({ children, width = 'wide' }: { children: ReactNode; width?: 'wide' | 'article' }) {
  const isArticle = width === 'article'
  const categories = useNavCategories()
  return (
    <>
      {/* 데스크톱 위쪽 메뉴: 홈과 같은 메뉴, 섹션 메뉴는 홈의 해당 위치로 (DESIGN.md §7) */}
      <Gnb menus={[...MESSAGE.MENUS]} anchorPrefix="/" categories={categories} />
      <main className="w-full min-h-screen flex flex-col items-center bg-canvas p-4 md:py-24">
        <div className={isArticle ? 'w-full md:px-8' : 'w-full max-w-6xl md:px-8'}>
          <div className={isArticle ? 'mx-auto max-w-article text-base md:text-lg flex flex-col gap-8' : 'flex flex-col gap-8'}>
            <Link to="/" className="text-sm text-ink-muted">
              {MESSAGE.POSTS_BACK_HOME}
            </Link>
            {children}
          </div>
        </div>
      </main>
    </>
  )
}
