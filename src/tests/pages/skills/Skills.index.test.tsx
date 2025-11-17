import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Skills from '../../../pages/main/Skills';

vi.mock('lottie-react', () => ({
  default: () => <div data-testid="lottie-mock" />,
}));

vi.mock('../../../../constants/skills', () => ({
  category: ['Language', 'Frontend'],
  skillData: {
    'Language': [
      { name: 'HTML', icon: '/test/html.svg' },
    ],
    'Frontend': [
      { name: 'React', icon: '/test/react.svg' },
    ],
  },
}));


describe('Skils/index.tsx 테스트', () => {

  it('Lottie 아이콘, 제목, 탭(SkillInfo) 컨텐츠를 모두 렌더링되어야 한다.', () => {
    
    // Given, when
    render(<Skills />);

    // Then
    
    // 1. 가짜 Lottie가 렌더링 되었는가?
    expect(screen.getByTestId('lottie-mock')).toBeInTheDocument();

    // 2. 'AnimatedLetters' 컴포넌트가 렌더링하는 'aria-label="Skills"'를 찾는다.
    expect(screen.getByLabelText('Skills')).toBeInTheDocument();

    // 3. 'getByTestId' 대신, "진짜" SkillInfo가 렌더링하는 'constants/skills'의 mock 데이터('Language' 탭)를 찾는다.
    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByText('HTML')).toBeInTheDocument();
  });

});