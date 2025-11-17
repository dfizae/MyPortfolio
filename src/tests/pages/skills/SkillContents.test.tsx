import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SkillContentDisplay from '../../../pages/main/Skills/SkillContentDisplay';
import { type Skill } from '../../../constants/Skills';

describe('SkillContentDisplay 컴포넌트 테스트', () => {

  it('props로 전달된 skills 배열을 기반으로 SkillBadge 목록을 렌더링해야 한다', () => {
    
    // Given
    const mockSkills: Skill[] = [
      { name: 'Skill A', icon: '/test/a.svg' },
      { name: 'Skill B', icon: '/test/b.svg' }
    ];

    // When
    render(<SkillContentDisplay skills={mockSkills} />);

    // Then
    expect(screen.getByText('Skill A')).toBeInTheDocument();
    expect(screen.getByText('Skill B')).toBeInTheDocument();

    const imageA = screen.getByAltText('Skill A 로고');
    const imageB = screen.getByAltText('Skill B 로고');

    expect(imageA).toBeInTheDocument();
    expect(imageB).toBeInTheDocument();
    expect(imageA).toHaveAttribute('src', '/test/a.svg');
    expect(imageB).toHaveAttribute('src', '/test/b.svg');
  });

  it('skills prop이 빈 배열일 경우, 아무것도 렌더링하지 않아야 한다.', () => {
    
    // Given
    const emptySkills: Skill[] = [];

    // When
    render(<SkillContentDisplay skills={emptySkills} />);

    // Then
    expect(screen.queryByAltText(/로고$/)).not.toBeInTheDocument();
  });

});