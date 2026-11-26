---
paths:
  - "src/**"
---

# TypeScript, 컴포넌트, 파일 구조

## TypeScript

- `strict` 설정 기준으로 타입 오류 없이 쓴다. `npm run typecheck`(라우트 타입 생성 + `tsc -b`)가 통과해야 한다.
- 명시적인 사유 없이 `any`, `@ts-ignore`, `@ts-expect-error`, non-null assertion(`!`)을 쓰지 않는다.
- 밖에서 들어오는 값(라우트 `params`, 검색 파라미터, md frontmatter)은 `unknown`이나 `string | undefined`로 받아 좁힌 뒤 쓴다. frontmatter 검증 방식은 `src/utils/posts.server.ts`를 따른다.
- 타입 단언으로 오류를 숨기지 말고 타입 가드나 구조 개선으로 푼다.
- 라우트 모듈은 생성 타입(`./+types/<라우트>`)을 먼저 쓴다. 조건부로 등록돼 생성 타입이 없을 수 있는 라우트는 `react-router`의 타입을 직접 쓴다(`src/routes/post.tsx` 주석).
- 가능한 값이 정해져 있으면 `string` 대신 유니온을 쓴다(예: `PostCategory`, `ScrollFadeIn`의 `direction`).

## 컴포넌트 책임

- 홈 섹션은 `src/pages/main/<Section>/index.tsx`가 컨테이너(데이터와 배치)이고, 나머지 파일이 프레젠터(props를 받아 그리기)다.
- 라우트 모듈(`src/routes/`)은 데이터 처리와 UI 로직을 직접 갖지 않고 `src/pages/`의 컴포넌트에 넘긴다.
- 한 곳에서만 쓰는 작은 로직은 가까이 둔다. 재사용이 확인됐을 때만 공통화한다.

## 파일 배치

| 무엇 | 어디 |
| --- | --- |
| 여러 화면이 쓰는 UI | `src/components/common/` |
| 커스텀 훅 | `src/hooks/` |
| 순수 함수, 빌드 때 쓰는 읽기 코드 | `src/utils/` |
| 데이터, 문구, 공용 타입 | `src/constants/` |
| 홈 섹션 | `src/pages/main/<Section>/` |
| 블로그 화면 | `src/pages/blog/` |
| 테스트 | `src/tests/` 아래 원본과 같은 갈래(예: `src/tests/pages/projects/ProjectCard.test.tsx`) |

- 한 파일 안에서만 쓰는 하위 컴포넌트는 따로 파일로 빼지 않는다.
- 요청 없이 공개 export 구조를 바꾸지 않는다. 순환 참조를 만들지 않는다.

## 주석

주석은 두 가지만 쓴다. 파일을 연 사람이 역할과 위치를 바로 잡게 하는 "무엇" 한 줄, 그리고 코드만으로는 알 수 없는 "왜".

### 무엇 — 정해진 자리에 한 줄씩

- **파일의 주 export 위**: 그 컴포넌트, 훅, 함수, 모듈이 맡는 일을 한 줄로 쓴다(예: `src/hooks/useNavCategories.ts`, `src/utils/posts.server.ts` 맨 위, `src/pages/main/Posts/index.tsx`). 새로 만드는 파일에는 기본으로 넣는다. 이름과 props만 봐도 뻔한 작은 프레젠터는 생략한다.
- **한 파일에 export가 여럿일 때**: 각 export 위에 역할 한 줄(예: `src/utils/posts.server.ts`의 함수들).
- **긴 JSX 반환부**: 구획이 셋 이상이면 구획이 시작하는 곳에 `{/* 구획 이름 */}` 한 줄을 둔다. 구획이 하나둘이면 쓰지 않는다.
- **데이터·문구 묶음**: `src/constants/`의 묶음 제목(예: `Text.ts`의 `// Contact 폼`)과, 이름만으로 뜻이 안 잡히는 타입 필드 옆 설명(예: `Projects.ts`의 `role`, `cases`).

"무엇" 주석은 구현이 아니라 역할을 쓴다. "글 목록을 map으로 돈다"가 아니라 "홈의 글 섹션: 대표 글, 그 아래 최근 글".

### 왜 — 근거와 함께

- 코드만 봐서는 이유를 알 수 없는 결정, 우회, 제약에 쓴다. 근거(DESIGN.md 절, 날짜, 커밋)를 붙인다. 이 저장소의 기존 관례다(예: `src/components/common/ScrollFadeIn.tsx`의 threshold 주석, `src/pages/main/Projects/index.tsx` 위 주석).
- "무엇"과 "왜"가 같은 자리에 오면 "무엇"을 먼저, "왜"를 다음 줄에 쓴다.

### 쓰지 않는 것

- 바로 아래 코드를 말로 되풀이하는 주석: import 설명(`// Lenis 훅`), 값 되풀이(`0.03, // 0.03초 간격`), 함수 본문 안의 단계별 설명. 본문이 주석 없이 안 읽히면 이름 있는 단위로 쪼갠다(규칙 00 가독성).
- JSDoc 블록(`/** @param … */`). 인자와 반환값은 타입과 이름이 말한다.
- 주석 처리한 코드, 수정 지시나 임시 표시(`// 1. [수정] …`, `TODO`).
- 주석을 달려고 요청 범위 밖의 파일을 고치지 않는다. 기존 파일은 만지는 김에 이 기준에 맞춘다.
