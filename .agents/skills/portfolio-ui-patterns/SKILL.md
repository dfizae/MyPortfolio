---
name: portfolio-ui-patterns
description: 이 포트폴리오 사이트의 화면 패턴과 완성 체크리스트. 홈 섹션, 카드·칩·링크, 위쪽 메뉴, 글 목록·글 상세, Contact 폼을 만들거나 고칠 때 사용한다. 값은 docs/DESIGN.md에서 가져오고, 이 스킬은 어디를 읽고 무엇을 빠뜨리지 말지만 정한다.
metadata:
  author: project
  version: "1.0.0"
---

# portfolio-ui-patterns

이 사이트를 여는 사람은 대부분 채용 담당자와 면접관이다. 첫 화면에서 누구인지, 무엇을 만들었는지를 바로 알 수 있어야 하고, 프로젝트에서 근거(문제 해결 사례, 회고 글)로 끊기지 않고 이어져야 한다.

- 값과 의도: `docs/DESIGN.md` (이 스킬에 값을 적지 않는다)
- 금지와 순서: `CLAUDE.md` "디자인 규칙", "콘텐츠 규칙"
- 세부 규칙: `.agents/rules/40-styling-accessibility.md`, `.agents/rules/50-error-security.md`

## 시작 전에 읽는 것

1. DESIGN.md §7 컴포넌트 표에서 만들 요소와 가장 가까운 행
2. DESIGN.md §9 쌓인 규칙 전체 (짧다. 같은 실수를 막는 이유가 적혀 있다)
3. 고칠 파일과 같은 갈래의 기존 컴포넌트 한 개 (예: 카드면 `src/pages/main/Projects/ProjectCard.tsx`)

빈칸(`___`)이 걸리면 그 값을 정하지 말고 묻는다.

## 공통 체크리스트

완성으로 보고하기 전에 모두 확인한다.

- [ ] 문구는 전부 `Text.ts`의 `MESSAGE`. 새 문구의 톤, 한영 혼용, 이모지 여부는 DESIGN.md §6
- [ ] 색·글자·간격은 토큰만. `npm run tokens:check` 통과
- [ ] 면의 깊이는 canvas → surface → canvas 순서로 번갈아 쌓고, 카드에 테두리를 두르지 않는다(§9 2026-08-25)
- [ ] 브랜드색은 §2.3의 허용 면적(버튼, pill, 언더라인, 링크 hover, 포커스 링)에서만
- [ ] 링크는 값이 있는 것만 그린다. 새 탭 외부 링크는 `rel="noopener noreferrer"`
- [ ] 등장 효과는 `ScrollFadeIn`·`AnimatedLetters` 재사용, 뷰포트보다 긴 영역은 카드 단위(§9 2026-08-21)
- [ ] 반응형은 `md:` `lg:` 두 단계. 390px, 768px, 1024px, 1440px 너비에서 깨지지 않는지 본다
- [ ] 누르는 요소는 `<button>`이나 링크, 키보드로 닿고 포커스가 보인다
- [ ] 데이터가 없을 때의 모습이 정해져 있다(아래 패턴별 기준)
- [ ] 공개 페이지에 싣지 않는 개인정보 규칙(§9 2026-10-12)을 지킨다

## 패턴별 기준

### 홈 섹션 (`src/pages/main/<Section>/`)

- `index.tsx`가 컨테이너(데이터와 배치), 나머지가 프레젠터다. 데이터는 `src/constants/`나 루트 라우트 loader에서 받는다.
- 섹션 제목은 기존 섹션과 같은 틀을 쓴다: `ScrollFadeIn` 안에 `AnimatedLetters` 제목(`src/pages/main/Projects/index.tsx`, `src/pages/main/Posts/index.tsx`).
- 섹션 순서를 바꾸거나 새 섹션을 끼울 때는 DESIGN.md §9의 순서 결정(글 섹션은 Profile 바로 아래 등)을 먼저 본다.
- 보여 줄 항목이 없으면 섹션을 그리지 않는다(`Posts`가 글 0편일 때 `null`).

### 카드, 칩, 문제 해결 사례

- 카드, 기술 칩, 문제 해결 사례는 §7 행을 그대로 따른다. 기술 하나에 칩 하나다(§9 2026-10-12).
- 프로젝트 카드 데이터의 형태는 `src/constants/Projects.ts`의 `Project` 타입이다. 필드를 더하면 `ProjectCard`와 그 테스트를 함께 고친다.

### 위쪽 메뉴 (`src/components/common/Gnb.tsx`)

- 홈, 글 상세, 분류 목록이 같은 메뉴를 같은 자리에 쓴다. 섹션 메뉴 뒤 세로 구분선 다음에 글 분류 링크(§7, §9 2026-11-23).
- 홈 밖에서 섹션 메뉴는 `/#id`로 이동한다. 분류 링크는 `NavLink`라 현재 페이지에 `aria-current`가 붙는다.
- 1024px 미만 메뉴는 보류된 결정이다(§10). 요청 없이 모바일 메뉴를 만들지 않는다.

### 글 목록, 글 상세 (`src/pages/blog/`)

- 글 상세는 본문 칸 너비에 맞춰 가운데에 두고, 분류 목록은 넓은 칸을 쓴다(§3.3 "페이지의 틀", `BlogLayout.tsx`).
- 본문 스타일은 `App.css`의 `.post-body` 아래 요소 선택자로만 바꾼다. md가 만든 HTML에는 클래스를 붙일 수 없다(§9 2026-11-23).
- 분류에 글이 없으면 목록 대신 `MESSAGE.POSTS_EMPTY`를 보인다(`CategoryPage.tsx`).
- 글 제목이 h1이다. 화면 안 다른 제목은 h2부터 쓴다.

### Contact 폼 (`src/pages/main/Contact/`)

- 버튼, 입력칸, 라벨은 §7 행을 따른다.
- 보내는 중에는 버튼을 막고 문구를 바꾼다, 입력 오류는 필드 가까이에, 보낸 뒤에는 성공 문구를 보인다. 상태는 Formspree `useForm`의 값을 쓴다(규칙 10).

## 완료 보고

- 참조한 DESIGN.md 절(예: §7 카드, §9 2026-08-25)
- 확인한 화면 너비와 확인 방법(개발 서버, 빌드 뒤 미리보기, 미확인이면 `TBD`)
- `npm run tokens:check`, `npm run lint`, `npx vitest run` 결과
- 정하지 않고 남긴 빈칸이 있으면 그 목록
