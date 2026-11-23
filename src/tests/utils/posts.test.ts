/// <reference types="node" />
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { getPost, getPostSlugs, getPostSummaries } from '../../utils/posts.server'

let dir: string

function write(file: string, frontmatter: string, body = '본문') {
  fs.writeFileSync(path.join(dir, file), `---\n${frontmatter}\n---\n\n${body}\n`)
}

beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'posts-'))
})

afterEach(() => {
  fs.rmSync(dir, { recursive: true, force: true })
})

describe('posts.server', () => {
  it('최근 날짜 순으로 읽고 draft와 _로 시작하는 파일은 뺀다', () => {
    write('older-post.md', 'title: 예전 글\ndate: 2026-11-01\ncategory: retrospect\nsummary: 요약\npinned: true')
    write('newer-post.md', 'title: 새 글\ndate: 2026-11-20\ncategory: thoughts\nsummary: 요약')
    write('draft-post.md', 'title: 초안\ndate: 2026-11-22\ncategory: study\nsummary: 요약\ndraft: true')
    write('_template.md', 'title: 템플릿\ndate: 2026-11-23\ncategory: retrospect\nsummary: 요약')

    const posts = getPostSummaries({ dir })
    expect(posts.map((p) => p.slug)).toEqual(['newer-post', 'older-post'])
    expect(posts[1]).toEqual({
      slug: 'older-post',
      title: '예전 글',
      date: '2026-11-01',
      category: 'retrospect',
      summary: '요약',
      pinned: true,
    })
    expect(getPostSlugs({ dir, includeDrafts: true })).toEqual(['draft-post', 'newer-post', 'older-post'])
  })

  it('본문 마크다운을 HTML로 바꾼다 (GitHub 표 포함)', async () => {
    write('table-post.md', 'title: 표\ndate: 2026-11-20\ncategory: study\nsummary: 요약', '## 소제목\n\n| a | b |\n|---|---|\n| 1 | 2 |')

    const post = await getPost('table-post', { dir })
    expect(post?.html).toContain('<h2>소제목</h2>')
    expect(post?.html).toContain('<table>')
    expect(await getPost('missing', { dir })).toBeNull()
  })

  it('frontmatter가 틀리면 파일 이름과 이유를 담아 멈춘다', () => {
    write('bad-category.md', 'title: 글\ndate: 2026-11-20\ncategory: diary\nsummary: 요약')
    expect(() => getPostSummaries({ dir })).toThrow('content/posts/bad-category.md: category는')
  })

  it('파일 이름이 주소 규칙(영문 소문자, 숫자, 하이픈)에 맞지 않으면 멈춘다', () => {
    write('Turn_Server.md', 'title: 글\ndate: 2026-11-20\ncategory: retrospect\nsummary: 요약')
    expect(() => getPostSummaries({ dir })).toThrow('content/posts/Turn_Server.md: 파일 이름은')
  })
})
