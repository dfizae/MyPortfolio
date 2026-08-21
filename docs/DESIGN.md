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

- 한 줄 정의: ___
  (예: "차분하지만 또렷한, 텍스트 중심의 프론트엔드 개발자 포트폴리오")
- 형용사 3개: ___ / ___ / ___
- 레퍼런스 (무엇을 가져올지 한 줄씩):
  - ___
  - ___
- 절대 하지 않을 것:
  - ___
  - ___
  - ___
- Figma 원본: README의 "피그마 작업물 링크" 참고

---

## 2. 색

### 2.1 역할 토큰 (채울 것)

| 역할 | 토큰 | 값 | 용도 |
|---|---|---|---|
| 페이지 배경 | `--color-bg` | ___ | body 기본 |
| 서피스 | `--color-surface` | ___ | 카드 / 폼 / 배지 배경 |
| 본문 글자 | `--color-ink` | ___ | 기본 텍스트 |
| 보조 글자 | `--color-ink-muted` | ___ | 설명, 캡션, 폼 라벨 |
| 브랜드 | `--color-brand` | ___ | 강조, 링크 hover, 버튼, 언더라인 |
| 브랜드 위 글자 | `--color-brand-ink` | ___ | 브랜드색 배경 위 텍스트 |
| 선 | `--color-line` | ___ | 보더, 구분선 |
| 성공 | `--color-success` | ___ | Contact 전송 완료 메시지 |

### 2.2 현재 코드에서 쓰이는 색 (매핑용)

- 배경: `bg-white` ×14, `bg-indigo-800` ×8, `bg-slate-200` ×6, `bg-indigo-900` ×3, `bg-slate-900`, `bg-slate-600`, `bg-indigo-200`, `bg-gray-400`
- 글자: `text-slate-700` ×13, `text-slate-900` ×7, `text-white` ×4, `text-gray-700` ×4, `text-slate-100/50/300/600`, `text-indigo-900`, `text-black`, `text-green-600`
- 선: `border-slate-700/300/50`, `border-indigo-900`
- 전역: `body { color: #fff }` (App.css) — 대부분의 섹션이 자체 색으로 덮어쓰고 있어 실질 효과는 거의 없음

→ 관찰: 팔레트는 사실상 **slate + indigo + white**. slate / gray 혼용 있음 (ContactForm 라벨).

### 2.3 규칙

- 위 토큰 외의 색 사용 금지 — Tailwind 팔레트 직접 사용(`slate-*`, `indigo-*`, `gray-*`), 임의 hex 모두 포함.
- 한 화면에서 브랜드색 면적은 ___ (예: 버튼·언더라인·포인트만. 큰 면 배경으로 쓰지 않음)
- 다크모드: 지원 안 함 / 지원 (택1) → ___

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
- 스크롤 등장 `ScrollFadeIn` 기본값: direction `up`, distance 20px, threshold 0.5, triggerOnce → 유지 / 변경: ___
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
- 이모지: ___ (현재 Profile 정보 라벨에 🧑‍💻 🎂 🎓 📍 📞 📧 사용, 그 외 없음)
- 숫자 / 날짜 표기: ___ (현재 "1999 / 05 / 16")
- 섹션별 한 줄 목적 — 읽는 사람이 이 섹션에서 가져갈 것:
  - Title: ___
  - Profile: ___
  - Skills: ___
  - Projects: ___
  - Contact: ___
- 금지 표현 / 피할 상투어: ___ (예: "열정적인", "최선을 다하는")
- 메타: `<title>` ___ (현재 "myportfolio") · `lang` ___ (현재 "en", 국문 사이트면 "ko") · 파비콘 ___ (현재 vite.svg) · OG 이미지/설명 ___

---

## 7. 컴포넌트 패턴

각 항목의 기본 / hover / focus-visible / disabled 상태를 §2 토큰으로 정의.

| 컴포넌트 | 위치 | 기본 | hover | focus-visible | 비고 |
|---|---|---|---|---|---|
| 내비 링크 | `common/Gnb.tsx` | slate-700, 언더라인 0 | indigo-900 + bold + 언더라인 | ___ | hover 시 bold로 폭이 변함 → 흔들림 확인 |
| 버튼(primary) | `Contact/ContactForm.tsx` | ___ | ___ | ___ | 현재 `focus:outline-none focus:shadow-outline` |
| 텍스트 인풋 | `Contact/ContactForm.tsx` | ___ | — | ___ | 라벨 `text-gray-700` / `text-slate-700` 혼용 |
| 카드 | `Projects/ProjectCard.tsx`, `Contact/ContactForm.tsx` | `bg-white rounded-2xl shadow-lg` | ___ | — | |
| 배지 | `Skills/SkillBadge.tsx` | `bg-slate-200 rounded-lg shadow-lg` | ___ | — | |
| 외부 링크 | `ProjectCard`, `Quickmenu`, `ProfileBackInfo` | ___ | ___ | ___ | `rel="noopener noreferrer"`: ProjectCard만 있음 |
| 섹션 제목 | 각 `pages/main/*/index.tsx` | ___ | — | — | |

---

## 8. 접근성 최소선

- 대비: 본문 4.5:1, 큰 글자 3:1 — 토큰 정한 뒤 검사 (`ink` on `bg`, `brand-ink` on `brand`, `ink-muted` on `surface`)
- 키보드: 모든 링크 / 버튼에 `focus-visible` 스타일 → ___
- 이미지 alt: 로고 / 아이콘 alt 규칙 → ___
- reduced-motion: §5

---

## 9. 작업하며 쌓인 규칙 (append-only)

> 형식: `- [YYYY-MM-DD] 규칙 — 왜`

- [2026-08-21] slate / gray 혼용 금지 — 같은 역할(폼 라벨)에 두 팔레트가 섞여 미세하게 톤이 다름
-

---

## 10. 미결 질문

- `focus:shadow-outline`은 Tailwind v1 클래스라 v4에 없음 → 현재 폼 인풋·버튼은 `outline-none`만 적용돼 **포커스 표시가 사실상 없음**. 의도한 포커스 스타일은? (`ring` 계열로 대체?)
- `body { color: #fff }` 전역값 — 토큰(`--color-ink`)으로 바꿀 때 흰 글자에 의존하던 곳이 있는지 확인 (Profile 뒷면, 인디고 배경 영역 등)
- 섹션 `id`(profile / skill / project / contact)와 메뉴 라벨 단·복수 통일 여부 (§6)
-
