import { Link } from 'react-router'
import { getCategory, type PostSummary } from '../../constants/Posts'

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
