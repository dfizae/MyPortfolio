import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProfileBack from '../../../pages/main/Profile/ProfileBack';
import { MESSAGE } from '../../../constants/Text';
import { EXPERIENCES } from '../../../constants/Experience';


describe('ProfileBack 컴포넌트 통합 테스트', () => {

  it('제목, 설명 및 경험 목록 데이터가 올바르게 렌더링되어야 한다.', () => {
    // Given & When
    render(<ProfileBack />);

    // Then (검증)
    
    // 1. 텍스트 상수(MESSAGE)가 화면에 보이는지 확인
    expect(screen.getByText(MESSAGE.MY_DIRECTION_TITLE)).toBeInTheDocument();
    expect(screen.getByText(/아이디어를 ‘작동하는 웹’으로/)).toBeInTheDocument();
    expect(screen.getByText(MESSAGE.MY_EXPERIENCE_TITLE)).toBeInTheDocument();

    // 2. EXPERIENCE.ts의 데이터가 자식 컴포넌트를 통해 렌더링되었는지 확인
    expect(screen.getByText(EXPERIENCES[0].name)).toBeInTheDocument(); 
    expect(screen.getByText(EXPERIENCES[1].name)).toBeInTheDocument(); 
  });

});