---
paths:
  - "src/App.tsx"
  - "src/root.tsx"
  - "src/routes/**"
  - "src/pages/**"
  - "src/components/**"
  - "src/hooks/**"
---

# React와 상태

## 상태 분류

- 상태를 더하기 전에 아래 중 어디에 속하는지 먼저 정한다.
  - **빌드 때 데이터**: 글 목록, 글 본문, 메뉴에 보일 분류처럼 loader가 만드는 값. 라우트 모듈에서 `loaderData`(`Route.ComponentProps`)나 `useLoaderData`로 받아 props로 내려 준다. 루트 loader 값은 `useRouteLoaderData('root')`로 읽는다(`src/hooks/useNavCategories.ts`).
  - **주소 상태**: 공유하거나 새로고침한 뒤에도 남아야 하는 분류, 필터, 정렬. 경로나 검색 파라미터(`useSearchParams`)에 둔다.
  - **폼 상태**: Contact 폼은 `@formspree/react`의 `useForm`이 돌려주는 상태(보내는 중, 성공, 오류)를 쓴다. 같은 값을 `useState`로 따로 두지 않는다.
  - **로컬 UI 상태**: 탭 선택, 카드 뒤집기처럼 한 컴포넌트 안에서 끝나는 값만 `useState`로 둔다.
  - **파생 상태**: props나 기존 상태에서 계산할 수 있는 값은 state로 저장하지 않고 렌더링 중에 계산한다.
- 같은 데이터를 여러 state에 중복 저장하지 않는다.
- 전역 상태 라이브러리는 없다. 필요해 보이면 props, 합성, loader로 먼저 풀어 보고, 그래도 들여야 하면 확인을 요청한다(규칙 60).

## Hook 선택

- Hook이 최신이라는 이유만으로 쓰지 않는다. 해결하려는 문제의 의미와 생명주기에 맞는 Hook을 고른다.
- `useEffect`는 외부 시스템과 동기화할 때만 쓴다(IntersectionObserver, lenis, framer-motion 컨트롤 등).
- 파생 값 계산, 사용자 이벤트 처리, 데이터 요청에 `useEffect`를 쓰지 않는다. 사용자 동작으로 생기는 로직은 이벤트 핸들러에 둔다.
- `useTransition`은 긴급하지 않은 렌더링 업데이트를 막지 않고 처리할 때만, `useDeferredValue`는 입력에 따라 다시 그리는 비용이 큰 UI를 늦출 때만 검토한다.
- `useMemo`, `useCallback`, `memo`는 습관적으로 넣지 않는다. 연산 비용이나 참조 동일성이 실제로 필요할 때만 쓴다.
