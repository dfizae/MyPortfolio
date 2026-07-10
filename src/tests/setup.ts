import '@testing-library/jest-dom';

import { vi } from 'vitest';

// IntersectionObserver를 mock하되, 관찰 시작 즉시 "화면에 보임"으로 콜백을 호출한다.
// 이로써 useInView 기반 컴포넌트(ScrollFadeIn, LottieIcon 등)가 테스트에서 정상 렌더링된다.
class MockIntersectionObserver {
  private callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element) {
    this.callback(
      [{ isIntersecting: true, intersectionRatio: 1, target } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }

  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
