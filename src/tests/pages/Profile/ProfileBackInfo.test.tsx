import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProfileBackInfo from '../../../pages/main/Profile/ProfileBackInfo';
import { type Experience } from '../../../constants/Experience';

describe('ProfileBackInfo 컴포넌트 단위 테스트', () => {
  
  const mockExperiences: Experience[] = [
    {
      name: '테스트 활동 A',
      duration: '2024.01 - 2024.02',
      description: '설명 A입니다.',
      link: 'https://test-a.com'
    },
    {
      name: '테스트 활동 B (링크 없음)',
      duration: '2024.03 - 2024.04',
      description: '설명 B입니다.',
    }
  ];

  it('props로 받은 경험 목록 데이터를 올바르게 렌더링해야 한다.', () => {
    render(<ProfileBackInfo experiences={mockExperiences} />);

    // 1. 활동 이름과 기간이 보이는가?
    expect(screen.getByText('테스트 활동 A')).toBeInTheDocument();
    expect(screen.getByText('2024.01 - 2024.02')).toBeInTheDocument();
    expect(screen.getByText('테스트 활동 B (링크 없음)')).toBeInTheDocument();
    expect(screen.getByText('2024.03 - 2024.04')).toBeInTheDocument();

    // 2. 설명 텍스트가 보이는가?
    expect(screen.getByText('설명 A입니다.')).toBeInTheDocument();
    expect(screen.getByText('설명 B입니다.')).toBeInTheDocument();
  });

  it('링크가 있는 항목만 링크 아이콘(a 태그)을 렌더링해야 한다', () => {
    render(<ProfileBackInfo experiences={mockExperiences} />);

    // 전체 화면에서 링크의 개수는 1개여야 한다.
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(1);
    
    // 그 링크가 올바른 주소를 가졌는지 확인
    expect(links[0]).toHaveAttribute('href', 'https://test-a.com');
  });
});