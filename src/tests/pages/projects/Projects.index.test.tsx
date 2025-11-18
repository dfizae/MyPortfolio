// 경로: src/tests/pages/main/Projects/index.test.tsx

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Projects from '../../../pages/main/Projects';

// 1. Lottie를 테스트에 제외하기 위해 mocking
vi.mock('lottie-react', () => ({
  default: () => <div data-testid="lottie-mock" />
}));

describe('Projects 페이지 통합 테스트', () => {

  it('제목, Lottie 아이콘, 그리고 실제 프로젝트 카드 목록을 렌더링해야 한다', () => {
    
    // Given, When
    render(<Projects />);

    // Then
    
    // 1. 가짜 Lottie가 렌더링 되었는가?
    expect(screen.getByTestId('lottie-mock')).toBeInTheDocument();

    // 2. AnimatedLetters'의 aria-label을 찾는다.
    expect(screen.getByLabelText('Projects')).toBeInTheDocument();

    // 3. GLYF, MyProtein이 잘나오는지 확인
    expect(screen.getByText('GLYF')).toBeInTheDocument();
    expect(screen.getByText('MyProtein')).toBeInTheDocument();
  });

});