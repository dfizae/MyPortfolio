import { Link } from 'react-router'
import { getCategory, type Post } from '../../constants/Posts'
import BlogLayout from './BlogLayout'

export default function PostArticle({ post }: { post: Post }) {
  const category = getCategory(post.category)
  return (
    <BlogLayout>
      <article className="flex flex-col gap-8 text-ink">
        <header className="flex flex-col gap-2 border-b-2 border-line pb-4">
          <span className="flex gap-2 text-sm text-ink-muted">
            <Link to={category.path}>{category.label}</Link>
            <time dateTime={post.date}>{post.date}</time>
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold text-ink">{post.title}</h1>
        </header>
        {/* 본문 HTML은 빌드 때 md에서 만든다. 글자 크기, 줄 간격, 줄 길이, 글 안 제목, 코드 블록 스타일은
            DESIGN.md에서 값을 정한 뒤 붙인다 (지금은 빈칸). */}
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </BlogLayout>
  )
}
