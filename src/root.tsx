import type { ReactNode } from 'react'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import { getNavCategoryIds } from './utils/posts.server'
import './styles/App.css'

// 모든 페이지가 쓰는 값: 위쪽 메뉴에 보일 글 분류 (빌드 때 계산, 개발 서버에서는 초안도 센다)
export async function loader() {
  return { navCategoryIds: getNavCategoryIds({ includeDrafts: import.meta.env.DEV }) }
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function Root() {
  return <Outlet />
}
