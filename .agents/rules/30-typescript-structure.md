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

- 주석은 "왜"만 쓰고, 근거(DESIGN.md 절, 날짜, 커밋)를 붙인다. 이 저장소의 기존 관례다(예: `src/components/common/ScrollFadeIn.tsx`의 threshold 주석, `src/pages/main/Projects/index.tsx` 위 주석).
- 코드가 하는 일을 되풀이하는 주석, 주석 처리한 코드, 임시 코드 표시를 남기지 않는다. 설명이 필요하면 먼저 이름과 구조를 고친다.
