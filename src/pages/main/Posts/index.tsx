import type { PostSummary } from '../../../constants/Posts'
import { MESSAGE } from '../../../constants/Text'
import AnimatedLetters from '../../../components/common/AnimatedLetters'
import ScrollFadeIn from '../../../components/common/ScrollFadeIn'
import PostList from '../../blog/PostList'

// 홈의 글 섹션: 대표 글, 그 아래 최근 글. 글이 하나도 없으면 섹션을 그리지 않는다.
// 목록이 뷰포트보다 길어질 수 있어 등장 애니메이션은 제목에만 건다 (DESIGN.md §9 2026-08-21).
export default function Posts({ pinned, recent }: { pinned: PostSummary[]; recent: PostSummary[] }) {
  if (pinned.length === 0 && recent.length === 0) return null

  return (
    <section className="w-full flex flex-col gap-8 lg:gap-12 justify-center items-center p-4 md:py-24 bg-canvas">
      <ScrollFadeIn direction="down">
        <AnimatedLetters text={MESSAGE.POSTS_SECTION_TITLE} className="text-4xl lg:text-6xl font-bold text-ink text-center" />
      </ScrollFadeIn>
      {pinned.length > 0 && (
        <div className="flex flex-col gap-4 w-full max-w-6xl px-8">
          <h3 className="text-2xl font-bold text-ink">{MESSAGE.POSTS_PINNED_TITLE}</h3>
          <PostList posts={pinned} />
        </div>
      )}
      {recent.length > 0 && (
        <div className="flex flex-col gap-4 w-full max-w-6xl px-8">
          <h3 className="text-2xl font-bold text-ink">{MESSAGE.POSTS_RECENT_TITLE}</h3>
          <PostList posts={recent} />
        </div>
      )}
    </section>
  )
}
