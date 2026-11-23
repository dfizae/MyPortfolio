import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { MESSAGE } from '../../constants/Text'

// 글 목록과 글 상세가 함께 쓰는 틀. 새 토큰 없이 기존 섹션 클래스를 쓴다.
export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <main className="w-full min-h-screen flex flex-col items-center bg-canvas p-4 md:py-24">
      <div className="w-full max-w-6xl px-8 flex flex-col gap-8">
        <Link to="/" className="text-sm text-ink-muted">
          {MESSAGE.POSTS_BACK_HOME}
        </Link>
        {children}
      </div>
    </main>
  )
}
