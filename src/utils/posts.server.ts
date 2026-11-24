/// <reference types="node" />
// content/posts/*.md를 읽는다. 빌드할 때(loader, prerender 목록)만 실행되고 브라우저 번들에는 들어가지 않는다.
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { POST_CATEGORIES, POST_CATEGORY_IDS, type Post, type PostCategory, type PostSummary } from '../constants/Posts'

export const POSTS_DIR = path.resolve('content/posts')

type ReadOptions = {
  dir?: string
  // true면 draft: true인 글도 포함한다. loader는 import.meta.env.DEV를 넘긴다.
  includeDrafts?: boolean
}

type ParsedPost = { summary: PostSummary; draft: boolean; body: string }

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const DATE = /^\d{4}-\d{2}-\d{2}$/

function fail(file: string, message: string): never {
  throw new Error(`content/posts/${file}: ${message}`)
}

// YAML은 따옴표 없는 2026-11-23을 Date로 읽으므로 문자열로 되돌린다.
function toDateString(file: string, value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString().slice(0, 10)
  if (typeof value === 'string' && DATE.test(value)) return value
  return fail(file, 'date는 YYYY-MM-DD로 쓴다')
}

function requireText(file: string, data: Record<string, unknown>, key: string): string {
  const value = data[key]
  if (typeof value !== 'string' || value.trim() === '') fail(file, `${key}가 비어 있다`)
  return value.trim()
}

function optionalFlag(file: string, data: Record<string, unknown>, key: string): boolean {
  const value = data[key]
  if (value === undefined) return false
  if (typeof value !== 'boolean') fail(file, `${key}는 true 또는 false로 쓴다`)
  return value
}

function parseFile(dir: string, file: string): ParsedPost {
  const slug = file.slice(0, -'.md'.length)
  if (!SLUG.test(slug)) fail(file, '파일 이름은 영문 소문자, 숫자, 하이픈만 쓴다 (주소가 된다)')

  const { data, content } = matter(fs.readFileSync(path.join(dir, file), 'utf8'))
  const category = data.category
  if (typeof category !== 'string' || !POST_CATEGORY_IDS.includes(category)) {
    fail(file, `category는 ${POST_CATEGORY_IDS.join(', ')} 중 하나로 쓴다`)
  }

  return {
    summary: {
      slug,
      title: requireText(file, data, 'title'),
      date: toDateString(file, data.date),
      category: category as PostCategory,
      summary: requireText(file, data, 'summary'),
      pinned: optionalFlag(file, data, 'pinned'),
    },
    draft: optionalFlag(file, data, 'draft'),
    body: content,
  }
}

// _로 시작하는 파일(_template.md 등)은 글로 읽지 않는다.
function readAll({ dir = POSTS_DIR, includeDrafts = false }: ReadOptions): ParsedPost[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md') && !file.startsWith('_'))
    .map((file) => parseFile(dir, file))
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => b.summary.date.localeCompare(a.summary.date) || a.summary.slug.localeCompare(b.summary.slug))
}

// 최근 날짜 순
export function getPostSummaries(options: ReadOptions = {}): PostSummary[] {
  return readAll(options).map((post) => post.summary)
}

export function getPostSlugs(options: ReadOptions = {}): string[] {
  return readAll(options).map((post) => post.summary.slug)
}

// 위쪽 메뉴에 보일 분류. 분류마다 글이 minPostsForNav편 이상일 때만 넣는다.
export function getNavCategoryIds(options: ReadOptions = {}): PostCategory[] {
  const posts = getPostSummaries(options)
  return POST_CATEGORIES.filter((c) => posts.filter((p) => p.category === c.id).length >= c.minPostsForNav).map((c) => c.id)
}

export async function getPost(slug: string, options: ReadOptions = {}): Promise<Post | null> {
  const found = readAll(options).find((post) => post.summary.slug === slug)
  if (!found) return null
  const html = String(
    await unified().use(remarkParse).use(remarkGfm).use(remarkRehype).use(rehypeStringify).process(found.body),
  )
  return { ...found.summary, html }
}
