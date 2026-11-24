---
name: new-page-route
description: 새 페이지(주소)를 더하는 절차. 문구, 화면 컴포넌트, 라우트 모듈(loader·meta), src/routes.ts 등록, 빌드 때 HTML 생성 확인, 메뉴 연결, 테스트까지 순서대로 다룬다. "○○ 페이지 만들어줘", "/projects 같은 주소 추가", 분류 추가처럼 경로가 새로 생기는 작업에 사용한다.
metadata:
  author: project
  version: "1.0.0"
---

# new-page-route

이 사이트는 런타임 서버 없이 빌드 때 경로마다 HTML을 미리 만든다(`ssr: false` + `prerender`). 그래서 새 페이지는 "화면이 뜬다"가 아니라 "`build/client`에 그 주소의 HTML이 생기고, 그 HTML에 제목과 OG 태그가 들어 있다"까지 확인해야 끝난다.

세부 규칙은 `.agents/rules/20-routing-content.md`에 있다.

## 1. 범위 확인

- 주소, 메뉴 이름, 페이지 제목, 설명 문구가 정해졌는지 확인한다. 메뉴 라벨 규칙은 DESIGN.md §6이다. 정해지지 않았으면 묻는다.
- 요청에 없는 메뉴 항목, 섹션, 필터를 함께 만들지 않는다.
- 데이터가 어디서 오는지 정한다: 고정 데이터면 `src/constants/`, 글처럼 빌드 때 읽어야 하면 loader.

## 2. 문구

- `src/constants/Text.ts`의 `MESSAGE`에 화면 문구와 메타 문구를 더한다. 페이지 제목은 기존 라우트처럼 `<제목> | MESSAGE.META_NAME` 형식이다(`src/routes/category.tsx`).

## 3. 화면 컴포넌트

- 화면은 `src/pages/` 아래에 둔다(홈 섹션은 `src/pages/main/`, 블로그 화면은 `src/pages/blog/`). 블로그 갈래 화면이면 `BlogLayout`을 재사용한다.
- 화면 패턴과 완성 체크리스트는 `portfolio-ui-patterns` 스킬을 따른다.

## 4. 라우트 모듈 (`src/routes/<이름>.tsx`)

- 필요할 때만 `loader`를 둔다. 빌드 때 파일을 읽어야 하면 `src/utils/`의 `.server.ts` 모듈만 loader에서 import한다.
- `meta`에 `title`, `description`, `og:type`, `og:title`, `og:description`, `og:url`, `og:locale`을 둔다. `og:url`은 `new URL(<경로>, LINK.LINK_SITE).href`로 만든다(`src/routes/post.tsx`).
- 없는 대상을 요청받으면 loader에서 `throw data(null, { status: 404 })`.
- 기본 export 컴포넌트는 loader 값을 받아 화면 컴포넌트에 넘기기만 한다.

## 5. 경로 등록

- `src/routes.ts`에 `route('<경로>', 'routes/<이름>.tsx')`로 더한다.
- 매개변수 없는 경로는 `getStaticPaths()`가 자동으로 미리 만든다. 매개변수가 있으면 `react-router.config.ts`의 `prerender`에 주소 목록을 더한다.
- loader가 있는데 미리 만들 주소가 하나도 없을 수 있으면, 글 상세처럼 조건이 맞을 때만 등록한다(`src/routes.ts` 주석). 그렇지 않으면 빌드가 멈춘다.

## 6. 메뉴 연결 (요청받은 경우만)

- 위쪽 메뉴는 `src/components/common/Gnb.tsx`다. 배치 규칙은 DESIGN.md §7 내비 링크 행과 §9 2026-11-23을 따른다. 다른 페이지로 가는 링크는 `NavLink`를 써서 `aria-current`가 붙게 한다.

## 7. 테스트

- 화면 컴포넌트의 렌더링 테스트를 `src/tests/` 아래 같은 갈래에 둔다. 문구는 `MESSAGE`로 비교한다.
- 새 순수 함수에는 단위 테스트를 둔다. 규칙은 `.agents/rules/60-dependencies-tests.md`.

## 8. 검증

```bash
npm run lint
npx vitest run
npm run tokens:check
npm run build
```

빌드 뒤 HTML과 메타를 확인한다. `<경로>`는 앞의 `/`를 뺀 주소다.

```bash
ls build/client/<경로>/index.html
grep -o '<title>[^<]*</title>' build/client/<경로>/index.html
grep -o '<meta property="og:[a-z]*" content="[^"]*"' build/client/<경로>/index.html
```

- 로컬 `npm run preview`로 열 때는 주소 끝에 `/`를 붙인다(`CLAUDE.md` "명령").
- Vercel 미리보기 배포는 푸시한 뒤에만 볼 수 있다. 직접 보지 못했으면 보고에 `TBD`로 남긴다.

## 9. 보고

- 만든 주소와 생성된 HTML 파일 경로
- `<title>`과 OG 값(빌드 결과에서 읽은 그대로)
- 검증 명령 결과, 확인하지 못한 항목
