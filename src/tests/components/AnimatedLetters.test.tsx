import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AnimatedLetters from '../../components/common/AnimatedLetters';

describe('AnimatedLetters', () => {
  it('highlights에 든 낱말의 글자에만 highlightClassName을 입힌다', () => {
    // Given: 줄바꿈으로 나뉜 두 낱말을 강조하도록 지정
    render(
      <AnimatedLetters
        text={'신입\n프론트엔드\n개발자'}
        highlights={['프론트엔드', '개발자']}
        highlightClassName="text-accent"
      />,
    );

    // Then: 강조 낱말의 글자는 클래스가 있고, 나머지 글자는 없다
    expect(screen.getByText('프')).toHaveClass('text-accent');
    expect(screen.getByText('자')).toHaveClass('text-accent');
    expect(screen.getByText('신')).not.toHaveClass('text-accent');
  });

  it('highlights가 없으면 어떤 글자도 강조하지 않는다', () => {
    // Given: 강조 지정 없이 렌더링
    render(<AnimatedLetters text="개발자" highlightClassName="text-accent" />);

    // Then: 글자에 강조 클래스가 없다
    expect(screen.getByText('개')).not.toHaveClass('text-accent');
  });
});
