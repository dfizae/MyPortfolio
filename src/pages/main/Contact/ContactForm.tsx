import { MESSAGE } from '../../../constants/Text';
import { useForm, ValidationError } from '@formspree/react';

// 입력 요소 공통 스타일 — 어두운 면 토큰 (docs/DESIGN.md §2.1), 포커스는 focus-visible 링 (§8 키보드 접근성)
const FIELD_CLASS =
  "appearance-none border border-night-muted/40 rounded w-full py-3 px-4 " +
  "text-night-ink leading-tight bg-night " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";
const LABEL_CLASS = "block text-night-muted text-sm font-bold mb-2";
// 입력 오류 문구. 지정하지 않으면 body의 ink 색을 물려받아 ink 카드 위에서 보이지 않는다.
const ERROR_CLASS = "block mt-2 text-sm text-night-ink";

// Formspree로 보내는 문의 폼. 전송에 성공하면 폼 대신 감사 문구를 보여 준다.
export default function ContactForm() {
  const [state, handleSubmit] = useForm("mpwkwjpg");
  if (state.succeeded) {
      return (
        <div className="text-center p-8 bg-surface rounded-2xl shadow-lg">
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
      className="w-full max-w-lg bg-ink p-8 rounded-2xl shadow-lg"
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
          className={ERROR_CLASS}
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
          className={ERROR_CLASS}
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
          className={ERROR_CLASS}
          field="message"
          errors={state.errors}
        />
      </div>

      {/* 보내기 버튼 */}
      <div className="flex items-center justify-center">
        <button
          type="submit"
          disabled={state.submitting}
          className="bg-brand hover:bg-brand-hover text-brand-ink cursor-pointer
                     font-bold py-3 px-6 rounded-lg
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink
                     disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {state.submitting ? MESSAGE.FORM_BUTTON_SENDING : MESSAGE.FORM_BUTTON_SEND}
        </button>
      </div>
    </form>
  );
}
