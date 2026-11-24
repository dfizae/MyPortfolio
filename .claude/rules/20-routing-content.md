---
paths:
  - "src/routes.ts"
  - "src/routes/**"
  - "src/root.tsx"
  - "src/utils/posts.server.ts"
  - "src/constants/Posts.ts"
  - "react-router.config.ts"
  - "vercel.json"
  - "content/**"
---

# 라우팅, 빌드 때 HTML 생성, 글

## 라우트

- 경로는 `src/routes.ts`에만 등록하고, 라우트 모듈은 `src/routes/`에 둔다. 라우트 모듈은 loader, `meta`, 화면 조립만 맡고 화면 UI는 `src/pages/`의 컴포넌트에 둔다.
- 라우트 모듈은 기본 컴포넌트와 `meta`, `links`, `loader`, `clientLoader`만 export한다(`eslint.config.js`의 react-refresh 규칙이 허용하는 이름).
- 페이지의 `<title>`, description, OG 태그는 그 라우트의 `meta`에 둔다. 문구는 `Text.ts`의 `META_*`, 주소는 `HyperLink.ts`의 `LINK_SITE`로 만든다(DESIGN.md §9 2026-11-23).
- `react-router.config.ts`의 `prerender`는 매개변수 없는 경로(`getStaticPaths()`)와 배포할 글 주소를 합친다. 매개변수가 있는 경로를 새로 만들면 미리 만들 주소 목록을 직접 넣어야 HTML이 생긴다.
- loader가 있는 라우트가 미리 만드는 주소에 하나도 걸리지 않으면 `ssr: false` 빌드가 멈춘다. 글 상세 경로를 글이 있을 때만 등록하는 이유다(`src/routes.ts` 주석). 같은 조건이 생기는 경로는 같은 방식으로 막는다.
- 없는 주소나 없는 글은 loader에서 `throw data(null, { status: 404 })`로 끝낸다.
- 새 경로를 만들면 빌드 결과에 `build/client/<경로>/index.html`이 생기는지 확인한다. 로컬 `npm run preview`의 끝 `/` 차이는 `CLAUDE.md` "명령"을 따른다.

## 빌드 때만 도는 코드

- `src/utils/posts.server.ts`(`node:fs`, md 파서)는 loader, `src/routes.ts`, `src/root.tsx`, `react-router.config.ts`, 테스트에서만 import한다. 컴포넌트나 훅에서 import하면 Node 모듈과 파서가 브라우저 번들에 들어간다.
- 컴포넌트가 쓰는 글 타입과 상수는 `src/constants/Posts.ts`에서 가져온다.

## 글 (`content/posts/*.md`)

- 글 본문은 사용자가 쓴다. 요청 없이 글을 새로 쓰거나 본문을 고치지 않는다. 점검을 요청받으면 `post-check` 스킬을 따른다.
- frontmatter 형식은 `content/posts/_template.md`가 기준이고, 빌드 때 `src/utils/posts.server.ts`가 검증한다. 필드를 더하거나 바꾸면 `_template.md`, `posts.server.ts`의 검증, `src/constants/Posts.ts`의 `PostSummary`·`Post` 타입, `src/tests/utils/posts.test.ts`를 함께 고친다.
- 분류를 더하면 `src/constants/Posts.ts`의 `POST_CATEGORIES`, `Text.ts`의 분류 문구, DESIGN.md §6의 분류 메뉴 규칙을 함께 본다.
- 글 HTML은 빌드 때 이 저장소의 md로만 만든다. 외부에서 받은 텍스트를 HTML로 넣지 않는다(규칙 50).
