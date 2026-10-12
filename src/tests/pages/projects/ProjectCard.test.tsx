import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProjectCard from '../../../pages/main/Projects/ProjectCard';
import { type Project } from '../../../constants/Projects';
import { MESSAGE } from '../../../constants/Text';

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

    // 3. 스킬은 기술 하나당 칩 하나로 렌더링되는지 확인 (2026-10-12: 한 줄 pill → 칩 목록)
    const stack = screen.getByRole('list', { name: MESSAGE.PROJECT_STACK });
    expect(within(stack).getAllByRole('listitem').map((li) => li.textContent)).toEqual(['HTML', 'CSS', 'React']);

    // 4. 링크들이 올바른 href를 가지고 있는지 확인
    const webIcon = screen.getByAltText('웹사이트 아이콘');
    expect(webIcon.closest('a')).toHaveAttribute('href', 'https://test-web.com');

    const githubIcon = screen.getByAltText('깃허브 아이콘');
    expect(githubIcon.closest('a')).toHaveAttribute('href', 'https://test-github.com');

    const blogIcon = screen.getByAltText('블로그 아이콘');
    expect(blogIcon.closest('a')).toHaveAttribute('href', 'https://test-blog.com');
  });

  it('값이 없는 링크는 아이콘을 그리지 않고, 역할 줄과 문제 해결 사례를 보여 줘야 한다.', () => {
    // Given: 앱 프로젝트처럼 깃허브 · 피그마만 있고 웹 · 블로그는 없음
    const mockProject: Project = {
      name: 'App Project',
      period: '2026.01 - 2026.02',
      mainTitle: '앱 한 줄 소개',
      role: 'React Native · 3인 팀 · 프론트엔드',
      cases: [
        { problem: '값이 늦게 반영되는 문제', solution: '재조회 시점을 확장' },
        { problem: '키패드가 입력창을 덮는 문제', solution: '공용 래퍼로 전환' },
      ],
      skill: ['React Native'],
      links: { github: 'https://test-github.com', figma: 'https://test-figma.com' },
    };

    // When
    render(<ProjectCard project={mockProject} />);

    // Then
    // 1. 있는 링크만 그린다
    expect(screen.getByAltText('깃허브 아이콘').closest('a')).toHaveAttribute('href', 'https://test-github.com');
    expect(screen.getByAltText('피그마 아이콘').closest('a')).toHaveAttribute('href', 'https://test-figma.com');
    expect(screen.queryByAltText('웹사이트 아이콘')).not.toBeInTheDocument();
    expect(screen.queryByAltText('블로그 아이콘')).not.toBeInTheDocument();

    // 2. 역할 줄과 문제 해결 사례
    expect(screen.getByText('React Native · 3인 팀 · 프론트엔드')).toBeInTheDocument();
    expect(screen.getByText(MESSAGE.PROJECT_CASES_TITLE)).toBeInTheDocument();
    expect(screen.getByText('값이 늦게 반영되는 문제')).toBeInTheDocument();
    expect(screen.getByText('공용 래퍼로 전환')).toBeInTheDocument();
  });

});
