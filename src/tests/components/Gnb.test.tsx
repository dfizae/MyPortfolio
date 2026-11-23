import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router';
import Gnb from '../../components/common/Gnb';

describe('Gnb 컴포넌트 테스트', () => {

  it('props로 받은 메뉴들을 렌더링하고, 올바른 앵커 링크(#)를 가져야 한다.', () => {
    // Given
    const testMenus = ['Profile', 'Skixll', 'Project', 'Contact'];

    // When
    render(<Gnb menus={testMenus} />);

    // Then
    testMenus.forEach((menuName) => {
      // 1. 메뉴 텍스트가 보이는지 확인
      const linkElement = screen.getByText(menuName);
      expect(linkElement).toBeInTheDocument();

      // 2. href 속성이 소문자 id 속성명으로 되어있는지 확인
      const expectedHref = `#${menuName.toLowerCase()}`;
      expect(linkElement.closest('a')).toHaveAttribute('href', expectedHref);
    });
  });

  it('글 분류가 없으면 구분선과 분류 링크를 그리지 않는다.', () => {
    const { container } = render(<Gnb menus={['Profile']} />);
    expect(container.querySelectorAll('li')).toHaveLength(1);
  });

  it('글 분류는 구분선 뒤에 분류 목록 주소로 이어지고, 홈 밖에서는 섹션 메뉴가 홈의 위치로 간다.', () => {
    render(
      <MemoryRouter>
        <Gnb
          menus={['Profile', 'Contact']}
          anchorPrefix="/"
          categories={[{ path: '/retrospect', label: 'Retrospective' }, { path: '/study', label: 'Study' }]}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Profile').closest('a')).toHaveAttribute('href', '/#profile');
    expect(screen.getByText('Retrospective').closest('a')).toHaveAttribute('href', '/retrospect');
    expect(screen.getByText('Study').closest('a')).toHaveAttribute('href', '/study');

    const items = screen.getAllByRole('listitem', { hidden: true });
    // 섹션 2개, 구분선 1개, 분류 2개 순서
    expect(items).toHaveLength(5);
    expect(items[2]).toHaveAttribute('aria-hidden', 'true');
  });

});