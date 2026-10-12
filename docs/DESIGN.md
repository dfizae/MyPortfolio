# Design Spec — 김재영 포트폴리오

> 이 문서가 스타일·콘텐츠 결정의 **단일 소스(source of truth)** 입니다.
> 코드 토큰(`src/styles/App.css`의 `@theme`)은 이 문서를 그대로 옮긴 것이어야 합니다.
>
> - `___` = 아직 결정하지 않은 빈칸
> - `현재:` = 2026-08-21 기준 코드에 실제로 쓰이고 있는 값 (채우기용 참고. 토큰을 정하면 지워도 됨)

## 0. 이 문서 쓰는 법

- 새 색 / 크기 / 모션 값이 필요하면 **여기 먼저 추가 → `@theme` → 컴포넌트** 순서. 거꾸로 하지 않는다.
- 작업하다 "이건 이렇게 하지 말아 달라"고 느낀 건 §9에 한 줄씩 적는다. 규칙마다 **"왜"** 를 붙인다.
- 완벽하게 채우려 하지 말 것. 빈칸은 빈칸인 채로 두고 쓰면서 채운다.
- "하지 말 것" 목록이 "해라"보다 효과가 크다.

---

## 1. 방향

- 한 줄 정의: 밝고 경쾌하지만 또렷한, 텍스트 중심의 프론트엔드 개발자 포트폴리오
- 형용사 3개: 경쾌한 / 밝은 / 뚜렷한
- 레퍼런스 (무엇을 가져올지 한 줄씩):
  - C:\Users\SSAFY\refs\supanova-design-skill
  - C:\Users\SSAFY\refs\taste-skill
- 절대 하지 않을 것:
  - 무한 반복 애니메이션(마키·펄스·파티클·배경 영상) 금지 — "뚜렷한"과 충돌, 번들도 이미 818KB
  - 글로우·네온 그림자·그라데이션으로 강조 금지 — 강조는 브랜드색 1개 + 글자 굵기로만 ("밝은"은 색 면적이 아니라 대비로 만든다)
  - 섹션마다 다른 등장 방향 금지 — 현재 up/left/down 혼용. 방향은 한 가지, 리듬은 stagger로
  - 사용자에게 환경을 요구하는 안내 문구 금지 — 예: "데스크탑: 전체 화면으로 봐주세요:)"(2026-10-12 삭제). 레이아웃이 적응해야지 사용자가 맞추면 안 됨
  - "열정적인 / 최선을 다하는 / 끊임없이" 금지 — 사실(숫자·프로젝트명)로 대체
  - 정보 라벨에 이모지 금지 — 2026-10-12 확정, Profile 라벨에서 제거 (§6 이모지)
- Figma 원본: README의 "피그마 작업물 링크" 참고

---

## 2. 색

### 2.1 역할 토큰 (확정 2026-08-21 — "초안 + 밝게")

| 역할 | 토큰 | 값 | 용도 |
|---|---|---|---|
| 페이지 배경 | `--color-canvas` | `#f1f5f9` (slate-100) | body·섹션 바닥. 초안 slate-200에서 한 단계 밝게 |
| 서피스 | `--color-surface` | `#ffffff` | 카드 / 폼 / 배지 배경 |
| 본문 글자 | `--color-ink` | `#0f172a` (slate-900) | 제목·본문 모두. 위계는 굵기로 |
| 보조 글자 | `--color-ink-muted` | `#475569` (slate-600) | 설명, 캡션, 폼 라벨, 기간 |
| 브랜드 | `--color-brand` | `#4f46e5` (indigo-600) | 강조, 링크 hover, 버튼, pill, 언더라인, 포커스 링. 초안 indigo-800에서 선명하게 |
| 브랜드 위 글자 | `--color-brand-ink` | `#ffffff` | 브랜드색 배경 위 텍스트 |
| 선 | `--color-line` | `#cbd5e1` (slate-300) | 보더, 구분선 (장식선이라 대비 기준 없음) |
| 성공 | `--color-success` | `#15803d` (green-700) | Contact 전송 완료. green-600은 본문 대비 3.3:1로 탈락해 한 단계 진하게 |

- 토큰 이름은 `--color-bg` 대신 `--color-canvas` — Tailwind v4 유틸리티가 `bg-canvas` / `bg-surface` / `text-ink` / `text-ink-muted` / `bg-brand` / `text-brand-ink` / `border-line` / `text-success` 로 생김.
- 대비 검사 (WCAG, 2026-08-21 계산): ink/canvas **16.3** · ink/surface **17.9** · ink-muted/canvas **6.9** · ink-muted/surface **7.6** · brand-ink/brand **6.3** · brand(글자로)/canvas **5.7** · brand/surface **6.3** · success/surface **5.0** · success/canvas **4.6** — 본문 4.5:1 전부 통과.
- 현재 코드 → 토큰 매핑: `bg-slate-200`→`bg-canvas` · `bg-white`→`bg-surface` · `text-slate-900`/`text-slate-700`/`text-black`→`text-ink` · `text-slate-600`/`text-gray-700`→`text-ink-muted` · `bg-indigo-800`/`bg-indigo-900`/`text-indigo-900`/`before:bg-indigo-900`→`brand` · `text-slate-50`/`text-white`(인디고 위)→`text-brand-ink` · `border-slate-300`/`border-slate-700`→`border-line` · `text-green-600`→`text-success`. 그 외(`bg-slate-900/600`, `bg-indigo-200`, `bg-gray-400`, `text-slate-100/300`, `border-slate-50`)는 교체 시 역할을 보고 위 8개 중 하나로 — 새 토큰 추가는 여기 먼저.
- **어두운 면** (Profile 뒷면 경험 카드의 `bg-slate-600` / `bg-slate-900`): 토큰 추가 없이 **`bg-ink` + `text-surface`**(보조 글자 `text-surface/70`, 구분선 `border-surface/30`), 제목 pill만 `bg-brand text-brand-ink` — 2026-08-21 결정 (`ca07d0a`). 밝은 틴트가 필요하면 `bg-brand/10`처럼 토큰에 투명도 수식자(color-mix)로.

### 2.2 현재 코드에서 쓰이는 색 (매핑용)

- 배경: `bg-white` ×14, `bg-indigo-800` ×8, `bg-slate-200` ×6, `bg-indigo-900` ×3, `bg-slate-900`, `bg-slate-600`, `bg-indigo-200`, `bg-gray-400`
- 글자: `text-slate-700` ×13, `text-slate-900` ×7, `text-white` ×4, `text-gray-700` ×4, `text-slate-100/50/300/600`, `text-indigo-900`, `text-black`, `text-green-600`
- 선: `border-slate-700/300/50`, `border-indigo-900`
- 전역: `body { color: #fff }` (App.css) — 대부분의 섹션이 자체 색으로 덮어쓰고 있어 실질 효과는 거의 없음

→ 관찰: 팔레트는 사실상 **slate + indigo + white**. slate / gray 혼용 있음 (ContactForm 라벨).

**교체 진행 (배치 단위, 배치마다 커밋 1개)**
- ✅ 2026-08-21 `65f6ad3` — `@theme` 도입 + 공용 UI (Title · Gnb · SideText · Quickmenu), `tailwind.config.js` 제거
- ✅ 2026-08-21 `12a16ff` — Projects (index · ProjectCard) · Contact (index · ContactForm)
- ✅ 2026-08-21 `ca07d0a` — Profile (Comment · ProfileCard · ProfileInfo · ProfileBack · ProfileBackInfo · ScrollPinAnimation) + `body { color }` → `ink` 전환. 뒷면 어두운 면은 `bg-ink`/`text-surface` 재사용
- ✅ 2026-08-25 — Skills (index · SkillBadge · SkillCategory · SkillInfo) + `SkillCategory.test` / `SkillInfo.test` 단언 갱신(`bg-indigo-800`→`bg-brand`, `bg-white text-slate-700`→`bg-surface text-ink`). 배지 배경은 `bg-canvas`, SkillInfo 카드의 `border-4 border-slate-700`은 §7 카드 패턴에 맞춰 **제거**
- 남은 raw 색 클래스: 약 77곳 → 40곳 → 14곳 → **0곳 (`src/**` 전체, `@theme` 토큰 정의 제외)** (2026-08-25 확인)

### 2.3 규칙

- 위 토큰 외의 색 사용 금지 — Tailwind 팔레트 직접 사용(`slate-*`, `indigo-*`, `gray-*`), 임의 hex 모두 포함.
- 브랜드색 면적: **버튼 · pill · 언더라인 · 링크 hover · 포커스 링만.** 섹션·카드 같은 큰 면의 배경으로 쓰지 않는다 — "밝은"은 색 면적이 아니라 톤·대비로 만든다 (2026-08-21 확정)
- 다크모드: **지원 안 함** (2026-08-21 확정). 토큰이 역할 기반이라 필요해지면 값만 바꿔 추가할 수 있으니 미리 만들지 않는다

---

## 3. 타이포그래피

### 3.1 폰트

- 현재: **Paperlogy** (`'Paperozi'`로 등록, 100~900 전 웨이트 9개를 jsDelivr CDN에서 로드)
- 결정: 유지 / 교체 → ___
- 로드할 웨이트만 남기기: 현재 실제 사용은 bold(700) ×15, normal(400) ×3, medium(500) ×3, semibold(600) ×1, extrabold(800) ×1 → 9개 중 ___개만 로드
- 영문 / 숫자 폰트 별도 지정: ___ (안 함이면 비워둘 것)

### 3.2 스케일 (현재 11단계 → 5단계로 수렴)

| 단계 | 토큰 | 모바일 | 데스크톱(md+) | weight | line-height | 용도 / 현재 |
|---|---|---|---|---|---|---|
| display | `--text-display` | ___ | ___ | ___ | ___ | Title 히어로 (현재 5xl / md:7xl / lg:8xl, extrabold, 1.35) |
| h1 | `--text-h1` | ___ | ___ | ___ | ___ | 섹션 제목 (현재 4xl ~ 6xl 혼용) |
| h2 | `--text-h2` | ___ | ___ | ___ | ___ | 카드 제목 (현재 2xl ×8) |
| body | `--text-body` | ___ | ___ | ___ | ___ | 본문 (현재 base / lg 혼용) |
| caption | `--text-caption` | ___ | ___ | ___ | ___ | 라벨·배지·보조 (현재 sm ×6) |

- 현재 사용 빈도: sm 6 · base 4 · lg 3 · xl 3 · 2xl 8 · 3xl 1 · 4xl 4 · 5xl 1 · 6xl 3 · 7xl 1 · 8xl 1
- 자간(letter-spacing) 규칙: ___ (예: display만 -0.02em, 나머지 0)
- 본문 최대 줄 길이(measure): ___ ch (권장 60~75)

---

## 4. 레이아웃 & 간격

- 컨테이너 최대폭: ___ (현재 `max-w-6xl` ×2, 폼은 `max-w-lg` / `max-w-md`)
- 섹션 상하 패딩: 모바일 ___ / 데스크톱 ___ (현재 `py-24` ×3)
- 섹션 좌우 패딩: 모바일 ___ / 데스크톱 ___ (현재 `px-4`, `px-8`, `px-16` 혼용)
- 브레이크포인트: **md(768) / lg(1024) 두 단계만** (현재 md: 31회, lg: 20회, 그 외 0회) — 추가 시 사유를 §9에 적을 것
- 간격 스케일 허용 단계: ___ (현재 gap-4/6/8/12/16, p-4/6/8, py-1/3)
- 라디우스: sm ___ / md ___ / lg(카드) ___ / full(배지·아바타) — (현재 `rounded-2xl` ×8, `rounded-full` ×5, `rounded-lg` ×3, `rounded` ×3)
- 그림자 허용 단계: ___ (현재 `shadow-lg` ×9, `shadow` ×3)
- z-index 레이어: 고정 UI(Gnb / Quickmenu / SideText) ___ (현재 `z-10`), 모달/오버레이 ___

---

## 5. 모션

- 원칙 한 줄: ___ (예: "등장은 한 번만, 짧고 부드럽게. 장식용 반복 애니메이션 없음")
- Duration: fast ___ / base ___ / slow ___
  - 현재: hover 전환 `duration-200`, ScrollFadeIn 기본 0.7s, Lenis 1.2s
- Easing: ___
  - 현재: framer `easeOut`, Lenis `1.001 - 2^(-10t)`, 글자 등장은 spring(damping 12, stiffness 100)
- 스크롤 등장 `ScrollFadeIn` 기본값: direction `up`, distance 20px, triggerOnce, **threshold 0.15 + rootMargin `0px 0px -10% 0px`** (2026-08-21 `89a8615`로 0.5에서 변경, 이유는 §9) → duration·distance·방향은 유지 / 변경: ___
  - 섹션별 현재: Title up · Skills left · Projects down(100px) · Contact down → 방향 통일 여부: ___
- 글자 단위 stagger(`AnimatedLetters`): 0.03s 간격, 0.3s 딜레이 → 유지 / 변경: ___
- `prefers-reduced-motion`: ___ (현재 미대응. 대응 시 Lenis 비활성 + framer 등장 생략)
- 하지 않을 것: ___

---

## 6. 콘텐츠 & 톤

- 단일 소스: 모든 문구는 `src/constants/Text.ts`의 `MESSAGE`. 컴포넌트 하드코딩 금지. (현재 잘 지켜지고 있음)
- 말투: ___ (현재 "…입니다" / "…싶어요" 혼용)
- 문장 길이: 한 문장 ___자 이하, 한 문단 ___문장 이하
- 한·영 혼용:
  - 메뉴 / 섹션 라벨: 영문 (현재 Profile · Skill · Project · Contact) → 단수/복수 통일: ___
  - 본문: 국문
  - 기술명: 영문 원어 (React, TypeScript …)
- 이모지: 쓰지 않음 (2026-10-12 결정. Profile 정보 라벨의 이모지 제거)
- 숫자 / 날짜 표기: ___ (예시였던 생년월일 줄은 2026-10-12 삭제)
- 섹션별 한 줄 목적 — 읽는 사람이 이 섹션에서 가져갈 것:
  - Title: ___
  - Profile: ___
  - Skills: ___
  - Projects: ___
  - Contact: ___
- 금지 표현 / 피할 상투어: ___ (예: "열정적인", "최선을 다하는")
- 메타 (React 밖이라 `index.html`에 직접 둔다. 2026-10-12 결정): `<title>` "김재영 | 프론트엔드 개발자" · `lang` "ko" · 파비콘 `public/favicon.svg` (brand 바탕 + 흰 "김". Noto Sans KR Bold 윤곽선을 path로 옮겨 글꼴에 의존하지 않음) · OG `og:type` · `og:title`(= `<title>`) · `og:url` · `og:locale` · OG 설명(`description` · `og:description`) = 제출 PDF 소개 첫 문장 "웹에서는 되던 기능이 React Native 앱에서는 동작하지 않는 부분을 찾습니다." (2026-10-12 결정) · OG 이미지 ___

---

## 7. 컴포넌트 패턴

각 항목의 기본 / hover / focus-visible / disabled 상태를 §2 토큰으로 정의.

| 컴포넌트 | 위치 | 기본 | hover | focus-visible | 비고 |
|---|---|---|---|---|---|
| 내비 링크 | `common/Gnb.tsx` | `text-ink`, 언더라인 0 | `text-brand` + bold + `before:bg-brand` 언더라인 | ___ (현재 없음) | hover 시 bold로 폭이 변함 → 흔들림 확인 (`65f6ad3` 색만 교체) |
| 버튼(primary) | `Contact/ContactForm.tsx` | `bg-brand text-brand-ink rounded-lg font-bold py-3 px-6` | `bg-brand/90` | `focus-visible:ring-2 ring-brand ring-offset-2` | disabled `opacity-60 cursor-not-allowed` (`12a16ff`) |
| 텍스트 인풋 | `Contact/ContactForm.tsx` | `bg-surface border border-line text-ink rounded py-3 px-4 shadow` | — | `focus-visible:ring-2 ring-brand` | 라벨 `text-ink-muted text-sm font-bold` (`12a16ff`, `FIELD_CLASS`/`LABEL_CLASS` 상수) |
| 카드 | `Projects/ProjectCard.tsx`, `Contact/ContactForm.tsx` | `bg-surface rounded-2xl shadow-lg text-ink` | ___ (현재 없음) | — | 구분선 `border-line`, 보조 텍스트 `text-ink-muted` (`12a16ff`) |
| 기술 칩 | `Projects/ProjectCard.tsx` | 칩 하나에 기술 하나: `bg-canvas text-ink rounded-lg text-sm px-3 py-1` | — | — | 2026-10-12 brand pill 한 개(기술을 공백으로 이어 붙임) → 칩 여러 개. surface 카드 안이라 canvas (§9 면 깊이 규칙), brand 면은 쓰지 않음 |
| 문제 해결 사례 | `Projects/ProjectCard.tsx` | 제목 `text-sm font-bold text-brand` · 문제 `text-sm text-ink-muted` · 해결 `font-semibold text-ink` · 항목 사이 `border-t border-line` | — | — | 앱 프로젝트 카드만. 제출 PDF 2쪽 「문제 해결 사례」 목차와 같은 문장 (2026-10-12) |
| 퀵메뉴 버튼 | `common/Quickmenu.tsx` | `bg-surface rounded-full w-12 h-12` | `bg-brand/10 border-2 border-brand` | ___ (현재 없음) | `65f6ad3` |
| 경험 카드 (어두운 면) | `Profile/ProfileBackInfo.tsx` | `bg-ink text-surface rounded-2xl shadow-lg` · 제목 pill `bg-brand text-brand-ink rounded-full` · 기간 `text-surface/70 border-b-2 border-surface/30` | — | ___ (링크 아이콘) | 토큰 추가 없이 ink/surface 재사용, github 아이콘은 `bg-surface` 원형 (`ca07d0a`) |
| 프로필 카드 앞/뒤 · 코멘트 | `Profile/ProfileCard.tsx` `Profile/Comment.tsx` | `bg-surface text-ink rounded-2xl shadow-lg` | — | — | 이름 밑줄 `border-b-[3px] border-line` (`ca07d0a`) |
| 배지 | `Skills/SkillBadge.tsx` | `bg-canvas text-ink rounded-lg shadow-lg` | — (현재 없음) | — | `bg-surface` 카드 **안**에 놓이므로 canvas로 한 단계 낮춰 구분 (2026-08-25) |
| 탭 (카테고리) | `Skills/SkillCategory.tsx` | 컨테이너 `bg-surface rounded-full shadow-lg` · 활성 `bg-brand text-brand-ink` · 비활성 `bg-surface text-ink` | 비활성만 `bg-brand text-brand-ink` (200ms) | ___ (현재 없음. `li` + onClick이라 키보드 접근 자체가 안 됨 → §10) | 브랜드 면적 규칙(§2.3) 안 — pill 크기 (2026-08-25) |
| 외부 링크 | `ProjectCard`, `Quickmenu`, `ProfileBackInfo` | ___ | ___ | ___ | `rel="noopener noreferrer"`: ProjectCard · Quickmenu 있음, ProfileBackInfo 미적용. ProjectCard는 값이 있는 링크(GitHub · Figma · 웹 · 블로그)만 그린다 (2026-10-12) |
| 섹션 제목 | 각 `pages/main/*/index.tsx` | `text-ink font-bold` (전 섹션 교체 완료, 크기는 §3.2에서) | — | — | |

---

## 8. 접근성 최소선

- 대비: 본문 4.5:1, 큰 글자 3:1 — §2.1 토큰 조합은 2026-08-21 검사 통과(수치는 §2.1). 새 조합(예: `ink-muted` on `brand`)을 쓰려면 먼저 계산할 것
- 키보드: 모든 링크 / 버튼에 `focus-visible` 스타일 → ___
- 이미지 alt: 로고 / 아이콘 alt 규칙 → ___
- reduced-motion: §5

---

## 9. 작업하며 쌓인 규칙 (append-only)

> 형식: `- [YYYY-MM-DD] 규칙 — 왜`

- [2026-08-21] slate / gray 혼용 금지 — 같은 역할(폼 라벨)에 두 팔레트가 섞여 미세하게 톤이 다름
- [2026-08-21] 스크롤 등장 트리거는 섹션 높이에 의존하면 안 된다 (IntersectionObserver `threshold` ≤ 0.2 + `rootMargin`, 뷰포트보다 긴 섹션은 래퍼가 아니라 카드·항목 단위로 등장) — `threshold 0.5`가 모바일 1열 Projects 섹션을 9개월간 투명하게 만든 원인이었음 (`89a8615`)
- [2026-08-21] 색은 §2.1 역할 토큰 8개만, 상태색이 필요하면 대비 계산 후 여기 먼저 추가 — `success`를 green-600으로 두려다 본문 대비 3.3:1로 탈락해 green-700으로 올린 사례
- [2026-08-21] 어두운 면은 새 토큰 없이 `bg-ink` + `text-surface`(보조 `/70`), 틴트는 토큰 + 투명도 수식자(`bg-brand/10`) — 관리할 색을 8개로 유지. Profile 뒷면 경험 카드에서 `slate-600/900` 두 단계를 ink 한 단계로 (`ca07d0a`)
- [2026-08-25] 면의 깊이는 canvas → surface → canvas 순서로 번갈아 쌓는다 — 같은 토큰을 겹치면(흰 카드 위 흰 배지) 경계가 그림자에만 의존해 사라짐. SkillBadge를 `bg-surface` 아닌 `bg-canvas`로 둔 이유
- [2026-08-25] 카드에 테두리를 두르지 않는다. 면 구분은 배경색 + `shadow-lg`로 — 진회색 4px 테두리(SkillInfo)를 `border-line`으로 옮기면 §7 카드 패턴(Projects·Contact·Profile은 전부 테두리 없음)만 어긋난 채 남음
- [2026-10-12] 공개 사이트에는 생년월일·거주지를 싣지 않는다. 연락처 번호는 지금처럼 가린 채로 둔다 — 누구나 여는 페이지라 개인정보가 그대로 노출됨
- [2026-10-12] 정보 라벨은 글자만 쓴다(이모지 없음) — §1 금지 원칙 확정. 라벨 이름만으로 뜻이 충분하고 OS마다 이모지 모양이 달라 톤이 흔들림
- [2026-10-12] 화면 상태(카드 뒤집기 등)에 따라 문구를 사용 안내로 바꾸지 않는다 — Profile 코멘트가 뒤집힐 때 "전체 화면으로 봐주세요"로 바뀌던 것을 없애고 같은 문장 유지 (§1)
- [2026-10-12] 프로젝트 카드의 기술은 칩 여러 개(`bg-canvas`)로 보여 주고 brand 면은 쓰지 않는다 — 앱 프로젝트는 기술이 7개라 brand pill을 늘어놓으면 §2.3 브랜드 면적 규칙을 넘음. surface 카드 안이라 canvas (면 깊이 규칙)
- [2026-10-12] 링크는 값이 있는 것만 그린다(빈 `href` 금지) — 앱 프로젝트에는 웹 · 블로그 링크가 없고, 죽은 링크는 검토자가 페이지를 닫는 이유가 됨
- [2026-10-12] Projects는 앱·웹 프로젝트 카드(문제 → 해결 사례)를 먼저, 퍼블리싱 4종은 그 아래 묶음으로 둔다 — 제출 PDF와 같은 순서. 최신이고 직무와 가까운 경험을 앞에
- [2026-10-12] 한글은 단어 단위로 줄바꿈한다(`body { word-break: keep-all }`) — 모바일 390px에서 학력 줄이 "소프트웨/어"처럼 단어 중간에서 끊김
-

---

## 10. 미결 질문

- ~~`focus:shadow-outline` 무효 → 폼 포커스 표시 없음~~ — **닫힘 (`12a16ff`)**: `focus-visible:ring-2 ring-brand`(버튼은 `ring-offset-2`)로 복구. 나머지 링크·버튼(Gnb · Quickmenu · ProjectCard 아이콘 링크)의 focus-visible은 §7에 빈칸으로 남아 있음 → §8 키보드 항목 정할 때 일괄.
- ~~`body { color: #fff }` 전역값~~ — **닫힘 (`ca07d0a`)**: `color: var(--color-ink)`로 전환. 흰색 상속에 기대는 텍스트가 없음을 Profile·Skills 전부 확인(ProfileBack은 ProfileCard 뒷면의 `text-ink`를 상속). 어두운 면은 명시적으로 `text-surface`.
- 섹션 `id`(profile / skill / project / contact)와 메뉴 라벨 단·복수 통일 여부 (§6)
- ~~모바일에서 Projects 섹션이 안 나타나는 이슈~~ — **닫힘 (2025-11-18 ~ 2026-08-21).** 원인은 `ScrollFadeIn`의 `useInView threshold 0.5`(뷰포트 2배 길이 섹션에서 영원히 불충족). `threshold 0.15` + `rootMargin`으로 수정(`89a8615`), 실제 폰에서 표시 확인. 규칙은 §9로 이관. 상세 경위는 WORKLOG 2026-08-21 엔트리.
- `h-screen`/`min-h-screen`의 모바일 주소창 100vh 문제 → `100dvh` 전환 여부 (Title·Skills·Contact·ScrollPinAnimation 4곳). §4 레이아웃 토큰 정할 때 결정.
- `prefers-reduced-motion` 미대응 (§5). 등장 애니메이션을 래퍼 단위에서 카드 단위로 바꿀 때 같이.
- Tailwind v4 자동 소스 스캔이 `docs/*.md`·`README.md`의 클래스 문자열까지 읽어 `bg-slate-900/600`, `text-slate-100/300` 같은 **쓰이지 않는 유틸리티를 빌드 CSS에 생성**(2026-08-21 발견). 해롭진 않지만 "토큰 외 색 금지" 감사 때 노이즈 → `App.css`에 `@source not "../../docs"` 추가 검토. **선행 조건(Skills 배치 완료 + `src/**` raw 색 클래스 0)은 2026-08-25에 충족** — 이제 넣기만 하면 됨. 단 테스트 파일(`src/tests/**`)에도 클래스 문자열이 남아 있으므로 감사 스크립트를 만든다면 그쪽도 제외 대상.
- `Skills/SkillCategory.tsx`의 탭이 `<li onClick>` — 키보드 포커스·엔터가 안 되고 role도 없음. 색 교체(2026-08-25) 때 발견했으나 마크업 변경이라 §8 키보드 항목을 정할 때 `<button>`(또는 `role="tab"` + `tabIndex`)로 함께 처리.
-
