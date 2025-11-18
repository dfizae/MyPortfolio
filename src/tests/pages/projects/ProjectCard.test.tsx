import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProjectCard from '../../../pages/main/Projects/ProjectCard';
import { type Project } from '../../../constants/Projects';

describe('ProjectCard 컴포넌트 테스트', () => {

  it('props로 전달된 프로젝트 정보를 올바르게 렌더링해야 한다.', () => {
    // Given
    const mockProject: Project = {
      name: 'Test Project',
      period: '2025.01 - 2025.02',
      logo: '/test/logo.png',
      mainTitle: '테스트 메인 타이틀',
      descriptions: ['설명 1입니다', '설명 2입니다'],
      skill: ['HTML', 'CSS', 'React'], 
      links: {
        web: 'https://test-web.com',
        github: 'https://test-github.com',
        blog: 'https://test-blog.com'
      }
    };

    // When
    render(<ProjectCard project={mockProject} />);

    // Then
    
    // 1. 기본 텍스트 정보 확인
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('2025.01 - 2025.02')).toBeInTheDocument();
    expect(screen.getByText('테스트 메인 타이틀')).toBeInTheDocument();
    
    // 2. 설명 배열(descriptions)이 리스트로 잘 렌더링되는지 확인
    expect(screen.getByText('설명 1입니다')).toBeInTheDocument();
    expect(screen.getByText('설명 2입니다')).toBeInTheDocument();

    // 3. [핵심] 스킬 배열이 join(" ")으로 합쳐져서 렌더링되는지 확인
    expect(screen.getByText('HTML CSS React')).toBeInTheDocument();

    // 4. 링크들이 올바른 href를 가지고 있는지 확인
    const webIcon = screen.getByAltText('웹사이트 아이콘');
    expect(webIcon.closest('a')).toHaveAttribute('href', 'https://test-web.com');

    const githubIcon = screen.getByAltText('깃허브 아이콘');
    expect(githubIcon.closest('a')).toHaveAttribute('href', 'https://test-github.com');
    
    const blogIcon = screen.getByAltText('블로그 아이콘');
    expect(blogIcon.closest('a')).toHaveAttribute('href', 'https://test-blog.com');
  });

});