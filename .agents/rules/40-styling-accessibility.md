---
paths:
  - "src/App.tsx"
  - "src/pages/**"
  - "src/components/**"
  - "src/styles/**"
---

# 스타일, 모션, 접근성

## 토큰과 값

- 값과 의도의 단일 소스는 `docs/DESIGN.md`다. 이 규칙에는 값을 적지 않는다. UI를 만들거나 고치기 전에 DESIGN.md에서 해당 절(§2 색, §3 글자, §4 간격, §5 모션, §7 컴포넌트, §9 쌓인 규칙)을 읽는다.
- 금지 대상과 값을 더하는 순서는 `CLAUDE.md` "디자인 규칙"을 따른다. DESIGN.md의 `___` 빈칸이 필요하면 채우지 말고 묻는다.
- `npm run tokens:check`가 Tailwind 기본 팔레트, white·black 색 유틸리티, 임의 hex, 임의 px를 잡는다. 편집 직후 훅이 같은 검사를 그 파일에 돌린다.
- `scripts/token-allowlist.json`은 하네스를 들일 때 이미 있던 예외만 담는다. 새 위반을 목록에 넣어 통과시키지 않는다.
- `@theme`을 바꾸려면 DESIGN.md에 같은 이름과 값을 먼저 적는다. `tokens:check`가 두 파일이 맞는지 본다.
- 인라인 `style`은 측정값, 애니메이션 값처럼 클래스로 나타낼 수 없는 동적 값에만 쓴다.
- 반응형은 `md:` `lg:` 두 단계만 쓴다(DESIGN.md §4).
- 같은 클래스 조합이 반복된다는 이유만으로 컴포넌트를 뽑지 않는다. 의미 있는 UI 단위일 때만 뽑는다.

## 모션

- 등장 효과는 `src/components/common/`의 `ScrollFadeIn`, `AnimatedLetters`를 다시 쓴다. 뷰포트보다 긴 영역은 래퍼가 아니라 카드나 항목 단위로 건다(DESIGN.md §9 2026-08-21).
- DESIGN.md §1의 금지 목록(무한 반복 장식, 글로우·그라데이션 강조, 섹션마다 다른 등장 방향)을 따른다.
- 모션 값은 §5에 있는 것만 쓴다. `prefers-reduced-motion` 대응 방식은 §5·§10에 미결로 남아 있으니 필요하면 정하지 말고 묻는다.

## 마크업과 접근성

- 누르는 요소는 동작이면 `<button>`, 이동이면 `<a>`나 `Link`·`NavLink`로 만든다. `<li>`나 `<div>`에 `onClick`만 붙이지 않는다(DESIGN.md §10 Skills 탭 사례).
- 링크와 버튼에는 키보드 포커스 표시를 둔다. §7에 있는 포커스 패턴을 쓰고, 빈칸인 컴포넌트는 묻는다.
- 새 탭으로 여는 외부 링크에는 `rel="noopener noreferrer"`를 붙인다. 값이 있는 링크만 그린다(빈 `href` 금지, DESIGN.md §9 2026-10-12).
- 아이콘만 있는 링크와 버튼은 이미지 `alt`나 `aria-label`로 목적을 알린다. 장식용 이미지는 `alt=""`로 둔다.
- 현재 페이지 링크에는 `aria-current`가 붙어야 한다(`NavLink`가 붙인다).
- 성공과 오류를 색만으로 알리지 않고 문구를 함께 둔다.
- 새 색 조합은 대비를 먼저 계산한다(DESIGN.md §8).
