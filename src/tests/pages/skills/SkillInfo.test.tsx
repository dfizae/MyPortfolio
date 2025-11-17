import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import SkillInfo from '../../../pages/main/Skills/SkillInfo';
import { vi } from 'vitest'; // lottie, type 등의 테스트에 방해되는 요소를 렌더링되지 않게 설계

// Lottie 컴포넌트 Mocking
// vitest.mock을 사용해 Lottie 컴포넌트가 렌더링되지 않게 한다.
vi.mock('lottie-react', () => ({
  default: () => <div data-testid="lottie-mock" />,
}));

// 'constants/skills.ts' Mocking
// 실제 데이터를 import하면 경로가 복잡해지므로, 테스트용 가짜 데이터를 만든다.
vi.mock('../../../constants/skills', () => ({
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


describe('SkillInfo 컴포넌트 (통합 테스트)', () => {

  it('기본 탭(Language)과 해당 컨텐츠를 렌더링해야 합니다', () => {
    // Given, When
    render(<SkillInfo />);

    // Then
    // 1. 'Language' 탭이 활성화(bg-indigo-800)되어 있는가?
    expect(screen.getByText('Language')).toHaveClass('bg-indigo-800');
    // 2. 'Frontend' 탭은 비활성화(bg-white)되어 있는가?
    expect(screen.getByText('Frontend')).toHaveClass('bg-white');

    // 3. 'HTML' 뱃지가 화면에 보이는가?
    expect(screen.getByText('HTML')).toBeInTheDocument();
    
    // 4. 'React' 뱃지는 화면에 보이지 않는가?
    // (queryByText는 없으면 null을 반환, getByText는 없으면 에러 발생)
    expect(screen.queryByText('React')).not.toBeInTheDocument();
  });

  it('새로운 탭을 클릭하면 탭과 컨텐츠가 전환되어야 합니다', async () => {
    // Given 
    const user = userEvent.setup(); // 사용자 이벤트 시뮬레이터 준비
    render(<SkillInfo />);

    // When 
    // "Frontend" 탭을 찾아서 클릭한다.
    const frontendTab = screen.getByText('Frontend');
    await user.click(frontendTab);

    // Then 
    // 1. 'Frontend' 탭이 활성화(bg-indigo-800)되었는가?
    expect(frontendTab).toHaveClass('bg-indigo-800');
    // 2. 'Language' 탭은 비활성화(bg-white)되었는가?
    expect(screen.getByText('Language')).toHaveClass('bg-white');

    // 3. 'React' 뱃지가 화면에 나타났는가?
    expect(screen.getByText('React')).toBeInTheDocument();

    // 4. 'HTML' 뱃지는 화면에서 사라졌는가?
    expect(screen.queryByText('HTML')).not.toBeInTheDocument();
  });

});