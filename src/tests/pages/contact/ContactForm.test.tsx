import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ContactForm from '../../../pages/main/Contact/ContactForm';

const mockHandleSubmit = vi.fn((e) => {
  if (e && e.preventDefault) {
    e.preventDefault();
  }
});
const mockUseForm = vi.fn();

vi.mock('@formspree/react', () => ({
  useForm: (formId: string) => mockUseForm(formId),
  ValidationError: () => <div data-testid="validation-error" />,
}));

describe('ContactForm 컴포넌트 테스트', () => {
  
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseForm.mockReturnValue([
      { succeeded: false, submitting: false, errors: [] },
      mockHandleSubmit,
    ]);
  });

  it('이름, 이메일, 메시지 입력 필드와 보내기 버튼을 렌더링해야 한다.', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/성함/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/이메일/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/문의 내용/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /보내기/i })).toBeInTheDocument();
  });

  it('사용자가 입력 필드에 값을 타이핑할 수 있어야 한다', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/성함/i), '홍길동');
    await user.type(screen.getByLabelText(/이메일/i), 'test@example.com');
    await user.type(screen.getByLabelText(/문의 내용/i), '문의 내용');

    expect(screen.getByLabelText(/성함/i)).toHaveValue('홍길동');
    expect(screen.getByLabelText(/이메일/i)).toHaveValue('test@example.com');
    expect(screen.getByLabelText(/문의 내용/i)).toHaveValue('문의 내용');
  });

  it('폼 제출 시 handleSubmit 함수가 호출되어야 한다.', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    // 1. 필수 필드 채우기
    await user.type(screen.getByLabelText(/성함/i), '테스트 이름');
    await user.type(screen.getByLabelText(/이메일/i), 'test@email.com');
    await user.type(screen.getByLabelText(/문의 내용/i), '테스트 문의 내용입니다.');

    // 2. 버튼 클릭
    const submitButton = screen.getByRole('button', { name: /보내기/i });
    await user.click(submitButton);

    // 3. 호출 확인
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  it('전송 성공(succeeded: true) 시 성공 메시지를 보여줘야 합니다', () => {
    mockUseForm.mockReturnValue([
      { succeeded: true, submitting: false, errors: [] },
      mockHandleSubmit,
    ]);

    render(<ContactForm />);

    expect(screen.getByText(/감사합니다!/i)).toBeInTheDocument();
    expect(screen.getByText(/메시지가 성공적으로 전송되었습니다/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/성함/i)).not.toBeInTheDocument();
  });

  it('전송 중(submitting: true)일 때 버튼이 비활성화되고 텍스트가 변경되어야 합니다', () => {
    mockUseForm.mockReturnValue([
      { succeeded: false, submitting: true, errors: [] },
      mockHandleSubmit,
    ]);

    render(<ContactForm />);

    const submitButton = screen.getByRole('button');
    expect(submitButton).toHaveTextContent(/전송 중.../i);
    expect(submitButton).toBeDisabled();
  });

});