import { Link } from 'react-router'
import { getCategory, type PostSummary } from '../../constants/Posts'

// 글 목록의 한 항목: 분류, 날짜, 제목, 요약을 담은 카드. 누르면 글 상세로 간다.
// 카드 패턴(DESIGN.md §7): bg-surface + rounded-2xl + shadow-lg, 테두리 없음
export default function PostListItem({ post }: { post: PostSummary }) {
  return (
    <li className="w-full">
      <Link
        to={`/posts/${post.slug}`}
        className="bg-surface flex flex-col gap-2 p-6 md:p-8 rounded-2xl shadow-lg w-full text-ink"
      >
        <span className="flex gap-2 text-sm text-ink-muted">
          <span>{getCategory(post.category).label}</span>
          <time dateTime={post.date}>{post.date}</time>
        </span>
        <span className="text-2xl font-bold text-ink">{post.title}</span>
        <span className="text-ink-muted">{post.summary}</span>
      </Link>
    </li>
  )
}
