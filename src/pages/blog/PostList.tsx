import type { PostSummary } from '../../constants/Posts'
import PostListItem from './PostListItem'

export default function PostList({ posts }: { posts: PostSummary[] }) {
  return (
    <ul className="flex flex-col gap-8 w-full">
      {posts.map((post) => (
        <PostListItem key={post.slug} post={post} />
      ))}
    </ul>
  )
}
