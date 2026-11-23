import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router'
import Posts from '../../../pages/main/Posts'
import type { PostSummary } from '../../../constants/Posts'
import { MESSAGE } from '../../../constants/Text'

const post = (slug: string, overrides: Partial<PostSummary> = {}): PostSummary => ({
  slug,
  title: `${slug} 제목`,
  date: '2026-11-20',
  category: 'retrospect',
  summary: `${slug} 요약`,
  pinned: false,
  ...overrides,
})

describe('홈 Posts 섹션', () => {
  it('글이 없으면 아무것도 그리지 않는다', () => {
    const { container } = render(<Posts pinned={[]} recent={[]} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('대표 글과 최근 글을 나눠 보여 주고 카드는 글 주소로 이어진다', () => {
    render(
      <MemoryRouter>
        <Posts pinned={[post('turn-server', { pinned: true })]} recent={[post('ai-screens', { category: 'thoughts' })]} />
      </MemoryRouter>,
    )

    expect(screen.getByText(MESSAGE.POSTS_PINNED_TITLE)).toBeInTheDocument()
    expect(screen.getByText(MESSAGE.POSTS_RECENT_TITLE)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /turn-server 제목/ })).toHaveAttribute('href', '/posts/turn-server')
    expect(screen.getByRole('link', { name: /ai-screens 제목/ })).toHaveTextContent(MESSAGE.POST_CATEGORY_THOUGHTS)
  })

  it('대표 글이 없으면 대표 글 제목도 그리지 않는다', () => {
    render(
      <MemoryRouter>
        <Posts pinned={[]} recent={[post('only-recent')]} />
      </MemoryRouter>,
    )
    expect(screen.queryByText(MESSAGE.POSTS_PINNED_TITLE)).not.toBeInTheDocument()
    expect(screen.getByText(MESSAGE.POSTS_RECENT_TITLE)).toBeInTheDocument()
  })
})
