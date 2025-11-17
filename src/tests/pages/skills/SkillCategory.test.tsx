import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import SkillCategory from '../../../pages/main/Skills/SkillCategory';

// SkillCategory 컴포넌트 테스트
describe('SkillCategory 컴포넌트 (단위/통합 테스트)', () => {

  // 테스트 1: 렌더링 검증
  it('props에 따라 활성/비활성 탭을 올바르게 렌더링해야 합니다', () => {
    
    // as const를 사용해 'readonly' 타입 문제를 해결
    const testCategories = ['Language', 'Frontend'] as const;
    const activeTab = 'Language';
    const mockClickHandler = vi.fn(); // 빈 가짜 함수

    // When
    render(
      <SkillCategory 
        category={testCategories} 
        activeCategory={activeTab} 
        clickHandler={mockClickHandler} 
      />
    );

    // Then
    // 1. 활성 탭('Language')이 올바른 스타일을 가졌는지 확인
    const languageTab = screen.getByText('Language');
    expect(languageTab).toBeInTheDocument();
    expect(languageTab).toHaveClass('bg-indigo-800 text-white');

    // 2. 비활성 탭('Frontend')이 올바른 스타일을 가졌는지 확인
    const frontendTab = screen.getByText('Frontend');
    expect(frontendTab).toBeInTheDocument();
    expect(frontendTab).toHaveClass('bg-white text-slate-700');
  });


  // 테스트 2: 상호작용(클릭) 검증
  it('비활성 탭을 클릭하면 clickHandler 함수를 올바른 인자와 함께 호출해야 합니다', async () => {
    
    // Given
    const user = userEvent.setup();
    const mockClickHandler = vi.fn(); // 'vi.fn()'으로 가짜 함수 생성
    const testCategories = ['Language', 'Frontend'] as const;
    const activeTab = 'Language';
    
    render(
      <SkillCategory 
        category={testCategories} 
        activeCategory={activeTab} 
        clickHandler={mockClickHandler} 
      />
    );

    // When 
    // "Frontend" (비활성 탭)를 찾아서 클릭
    const frontendTab = screen.getByText('Frontend');
    await user.click(frontendTab);

    // Then
    // 1. 'mockClickHandler'가 정확히 1번 호출되었는지 확인
    expect(mockClickHandler).toHaveBeenCalledTimes(1);

    // 2. 'mockClickHandler'가 올바른 인자("Frontend")와 함께 호출되었는지 확인
    expect(mockClickHandler).toHaveBeenCalledWith('Frontend');
  });

});