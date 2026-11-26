import type { PostSummary } from '../../constants/Posts'
import { MESSAGE } from '../../constants/Text'
import BlogLayout from './BlogLayout'
import PostList from './PostList'

// 분류별 글 목록 화면. 글이 없으면 안내 문구를 보여 준다.
export default function CategoryPage({ label, posts }: { label: string; posts: PostSummary[] }) {
  return (
    <BlogLayout>
      <h1 className="text-4xl lg:text-6xl font-bold text-ink">{label}</h1>
      {posts.length > 0 ? <PostList posts={posts} /> : <p className="text-ink-muted">{MESSAGE.POSTS_EMPTY}</p>}
    </BlogLayout>
  )
}
