import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SkillBadge from '../../../pages/main/Skills/SkillBadge';

describe('SkillBadge.tsx 컴포넌트 테스트', () => {

  it('props로 전달된 name과 icon이 올바르게 연결되었는가?', () => {
    const testProps = {
      name: 'React',
      icon: '/images/icons/skills/React.svg'
    };
    const altText = `${testProps.name} 로고`;

    // When 
    render(<SkillBadge name={testProps.name} icon={testProps.icon} />);

    // Then
    
    // 1. "React"라는 텍스트가 화면에 보이는가?
    const nameElement = screen.getByText('React');
    expect(nameElement).toBeInTheDocument();

    // 2. "React 로고"라는 alt text를 가진 <img>가 화면에 보이는가?
    const iconElement = screen.getByAltText(altText);
    expect(iconElement).toBeInTheDocument();

    // 3. img의 src 속성이 올바른가?
    expect(iconElement).toHaveAttribute('src', testProps.icon);
  });

});