import { MESSAGE } from '../../../constants/Text';
import { useForm, ValidationError } from '@formspree/react';

// 입력 요소 공통 스타일 — 색은 디자인 토큰만 (docs/DESIGN.md §2.1), 포커스는 focus-visible 링 (§8 키보드 접근성)
const FIELD_CLASS =
  "shadow appearance-none border border-line rounded w-full py-3 px-4 " +
  "text-ink leading-tight bg-surface " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand";
const LABEL_CLASS = "block text-ink-muted text-sm font-bold mb-2";

// Formspree로 보내는 문의 폼. 전송에 성공하면 폼 대신 감사 문구를 보여 준다.
export default function ContactForm() {
  const [state, handleSubmit] = useForm("mpwkwjpg");
  if (state.succeeded) {
      return (
        <div className="text-center p-8">
            <h3 className="text-2xl font-bold text-success">
                {MESSAGE.FORM_SUCCESS_TITLE}
            </h3>
            <p className="text-ink-muted mt-2">
                {MESSAGE.FORM_SUCCESS_BODY}
            </p>
        </div>
      );
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg bg-surface p-8 rounded-2xl shadow-lg"
    >
      {/* 성함 */}
      <div className="mb-6">
        <label
          htmlFor="name"
          className={LABEL_CLASS}
        >
          {MESSAGE.FORM_LABEL_NAME}
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          className={FIELD_CLASS}
        />
        <ValidationError
          prefix="Name"
          field="name"
          errors={state.errors}
        />
      </div>

      {/* 이메일 */}
      <div className="mb-6">
        <label
          htmlFor="email"
          className={LABEL_CLASS}
        >
          {MESSAGE.FORM_LABEL_EMAIL}
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className={FIELD_CLASS}
        />
        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
        />
      </div>

      {/* 문의 내용 */}
      <div className="mb-6">
        <label
          htmlFor="message"
          className={LABEL_CLASS}
        >
          {MESSAGE.FORM_LABEL_MESSAGE}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={FIELD_CLASS}
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </div>

      {/* 보내기 버튼 */}
      <div className="flex items-center justify-center">
        <button
          type="submit"
          disabled={state.submitting}
          className="bg-brand hover:bg-brand/90 text-brand-ink cursor-pointer
                     font-bold py-3 px-6 rounded-lg
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2
                     disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {state.submitting ? MESSAGE.FORM_BUTTON_SENDING : MESSAGE.FORM_BUTTON_SEND}
        </button>
      </div>
    </form>
  );
}
