---
paths:
  - "package.json"
  - "package-lock.json"
  - "eslint.config.js"
  - "tsconfig.json"
  - "tsconfig.*.json"
  - "vite.config.ts"
  - "react-router.config.ts"
  - "vercel.json"
  - "src/tests/**"
  - "**/*.test.ts"
  - "**/*.test.tsx"
---

# 의존성, 설정, 테스트

## 의존성과 설정

- 패키지는 npm으로만 다룬다(`package-lock.json`). lockfile을 직접 고치지 않는다.
- 이미 있는 라이브러리로 풀리는 문제에 같은 목적의 새 라이브러리를 들이지 않는다. 애니메이션은 framer-motion, 스무스 스크롤은 lenis, md 변환은 unified 계열, 폼 전송은 @formspree/react다.
- 새 패키지 설치, 기존 패키지 제거, 주요 버전 변경 전에는 확인을 요청한다. 버전 사이의 요구 조건(예: react-router가 요구하는 React 버전)은 기억에 기대지 말고 공식 문서나 패키지 메타데이터로 확인한다.
- 설정 파일(`vite.config.ts`, `react-router.config.ts`, `vercel.json`, `tsconfig*.json`, `eslint.config.js`)을 넓게 바꾸기 전에는 확인을 요청한다.
- 오류를 없애려고 ESLint나 TypeScript 규칙을 끄거나 완화하지 않는다.

## 테스트

- 도구는 Vitest + React Testing Library + jest-dom(jsdom)이다. 설정은 `vite.config.ts`의 `test`, 공통 준비는 `src/tests/setup.ts`(IntersectionObserver 모킹)에 있다. 승인 없이 다른 테스트 도구를 들이지 않는다.
- 에이전트는 한 번만 도는 `npx vitest run`을 쓴다(`npm test`는 감시 모드).
- 위치는 `src/tests/` 아래 원본과 같은 갈래다. 형식은 기존 파일처럼 `describe`·`it`에 한국어 설명을 쓰고 Given / When / Then 주석으로 나눈다.
- 새 순수 함수(`src/utils/`)와 데이터 변환에는 단위 테스트를 함께 쓴다(예: `src/tests/utils/posts.test.ts`). 새 컴포넌트에는 props를 받아 그리는 결과를 보는 렌더링 테스트를 기본으로 둔다(`src/tests/pages/**` 방식).
- 화면 문구는 가능하면 `MESSAGE` 상수로 비교한다. 문구를 바꾸면 그 문구를 비교하는 테스트도 함께 고친다(`CLAUDE.md` "콘텐츠 규칙").
- 겉으로 보이는 결과(역할, 접근 가능한 이름, 문구, 링크 주소)를 먼저 검증한다. 클래스 단언은 디자인 결정 자체를 지키는지 볼 때만 쓴다(예: `src/tests/pages/skills/SkillCategory.test.tsx`의 활성 탭 색).
- 테스트가 깨지면 스펙을 테스트에 맞춰 바꾸지 않고 원인을 보고한다(`CLAUDE.md` "작업 관례"). 통과시키려고 테스트를 지우거나 검증을 약하게 만들지 않는다.
- E2E 도구는 없다. 페이지 단위 확인은 `npm run build` 뒤 `build/client`의 HTML과 Vercel 미리보기 배포로 한다.
