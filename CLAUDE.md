# MyPortfolio

Vite 7 + React 19 + TypeScript + Tailwind v4 로 만든 원페이지 스크롤 포트폴리오.
framer-motion(등장·글자 애니메이션) · lenis(스무스 스크롤) · lottie-react(섹션 아이콘) · @formspree/react(Contact 폼). Vercel 배포.

## 명령

- `npm run dev` · `npm run build` (tsc -b && vite build) · `npm run lint` · `npx vitest run`
- 스타일·문구 변경 후 최소 `npm run lint && npx vitest run`. 레이아웃·의존성 변경은 `npm run build`까지.

## 구조

- `src/pages/main/<Section>/` — 섹션별 컴포넌트 (Title · Profile · Skills · Projects · Contact). `index.tsx`가 컨테이너, 나머지는 프레젠터.
- `src/components/common/` — 공용 (Gnb, Quickmenu, SideText, ScrollFadeIn, AnimatedLetters, ScrollPinAnimation)
- `src/constants/` — 데이터·문구. **`Text.ts`의 `MESSAGE`가 모든 사용자 노출 문구**, 그 외 `Projects.ts` `Skills.ts` `Experience.ts` `HyperLink.ts` `ImageInfo.ts`
- `src/styles/App.css` — 전역 CSS, 폰트(@font-face), `@theme` 토큰
- `src/tests/` — vitest + React Testing Library (jsdom, IntersectionObserver 모킹은 `setup.ts`)
- `tailwind.config.js` — v3 잔재. Tailwind v4에선 읽지 않음. 토큰은 `@theme`에만 둔다.

## 디자인 규칙 — 상세·단일 소스는 `docs/DESIGN.md`

- 색 · 글자 크기 · 간격 · 라디우스 · 모션 값은 `@theme` 토큰만 사용. Tailwind 기본 팔레트(`slate-*` `indigo-*` `gray-*` 등), 임의 hex, 임의 px 금지.
- 새 값이 필요하면 **DESIGN.md에 먼저 추가 → `@theme` → 컴포넌트**. 순서를 거꾸로 하지 않는다.
- DESIGN.md의 `___`는 아직 미결정 값. 그 값이 필요하면 **추측해서 채우지 말고 사용자에게 묻는다.**
- 토큰이 아직 없는 영역은 새 색·크기를 추가하지 말고 기존 클래스를 재사용한다.
- 기존 raw 클래스는 토큰 작업 때 **만지는 파일만** 점진 교체. 전체 일괄 치환 금지 (diff 검토 불가).
- 반응형은 `md:` `lg:` 두 단계만.
- 모션은 DESIGN.md §5 값만. `prefers-reduced-motion` 존중.

## 콘텐츠 규칙

- 사용자 노출 문구는 전부 `src/constants/Text.ts`. 컴포넌트 하드코딩 금지.
- 톤 · 한영 혼용 · 이모지 규칙은 DESIGN.md §6.
- 문구를 바꾸면 `src/tests/**`가 그 문구를 직접 비교하는지 확인하고 같이 갱신.

## 작업 관례

- 커밋: `feat:` `fix:` `refactor:` `docs:` `chore:` `test:` + 한국어 요약 (기존 관례). 커밋·푸시는 요청 시에만.
- 테스트가 깨지면 스펙을 테스트에 맞춰 바꾸지 말고 원인(셀렉터 / 문구 / 구조)을 보고한다.
- 작업 중 새로 합의된 디자인 규칙은 DESIGN.md §9에 `[날짜] 규칙 — 왜` 형식으로 추가한다.
- 의미 있는 커밋 직후와 세션 마무리 전에 `docs/WORKLOG.md`를 갱신한다 (이력서·포트폴리오 소재. 절차·규칙은 그 파일 §1~3). 사용자가 "WORKLOG 갱신해줘"라고 하면 그 절차를 따른다.
  - `docs/WORKLOG.md`는 **.gitignore 대상(로컬 전용)**. 커밋·푸시하지 않는다. 파일이 없으면 Notion 미러(취준 아카이브 > WORKLOG)에서 복원한다. 변환 스크립트 `scripts/md-to-notion.mjs`는 추적 대상.

## 다른 PC에서 이어서 작업하기

Claude Code의 대화 기록·메모리는 PC별이라 따라오지 않는다. git에 없는 네 가지를 맞춘 뒤, **이 파일 → `docs/DESIGN.md` §2.2 진행 현황 → `docs/WORKLOG.md` 헤더 "다음 세션 시작점"** 순으로 읽고 시작한다.

1. 환경: `git clone https://github.com/dfizae/MyPortfolio.git && npm ci` (Node 24 기준). 레포 로컬 author 설정: `git config user.name dfizae` (email `gaza1268@naver.com`).
2. `docs/WORKLOG.md` 복원: Notion 미러(취준 아카이브 > "WORKLOG — MyPortfolio 작업 기록")에서. Claude에게 **"Notion WORKLOG 페이지에서 docs/WORKLOG.md 복원해줘"** — Notion MCP로 읽어 일반 md로 되돌린다(표는 파이프 표, 콜아웃은 `>` 인용, `\~`는 `~`, 탭 들여쓰기는 2칸). Notion MCP는 계정 연동이라 어느 PC든 같고, Chrome MCP는 확장 설치가 필요하다.
3. 레퍼런스 레포 clone — `docs/DESIGN.md` §1이 `C:\Users\SSAFY\refs\…` 절대경로를 가리키므로 경로가 다르면 §1을 갱신:
   - `git clone https://github.com/uxjoseph/supanova-design-skill.git`
   - `git clone https://github.com/Leonxlnx/taste-skill.git`
4. IDE에서 `docs/DESIGN.md`·`docs/WORKLOG.md`를 열어 둔 채 Claude가 편집하면 오래된 버퍼 저장으로 덮어쓸 수 있다 — Claude가 고친 직후엔 파일을 다시 연다.
