import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
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

});