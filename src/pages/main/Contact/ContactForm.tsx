import { useForm, ValidationError } from '@formspree/react';

export default function ContactForm() {
  const [state, handleSubmit] = useForm("mpwkwjpg");
  if (state.succeeded) {
      return (
        <div className="text-center p-8">
            <h3 className="text-2xl font-bold text-green-600">
                감사합니다!
            </h3>
            <p className="text-gray-700 mt-2">
                메시지가 성공적으로 전송되었습니다.
            </p>
        </div>
      );
  }
  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg"
    >
      {/* --- 이름 --- */}
      <div className="mb-6">
        <label 
          htmlFor="name" 
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          성함
        </label>
        <input
          id="name"
          type="text" 
          name="name"
          required
          className="shadow appearance-none border rounded w-full py-3 px-4 
                     text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <ValidationError 
          prefix="Name" 
          field="name"
          errors={state.errors}
        />
      </div>

      <div className="mb-6">
        <label 
          htmlFor="email" 
          className="block text-slate-700 text-sm font-bold mb-2"
        >
          이메일
        </label>
        <input
          id="email"
          type="email" 
          name="email"
          required
          className="shadow border rounded w-full py-3 px-4 
                     text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <ValidationError 
          prefix="Email" 
          field="email"
          errors={state.errors}
        />
      </div>
      <div className="mb-6">
        <label 
          htmlFor="message" 
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          문의 내용
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="shadow appearance-none border rounded w-full py-3 px-4 
                     text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <ValidationError 
          prefix="Message" 
          field="message"
          errors={state.errors}
        />
      </div>
      <div className="flex items-center justify-center">
        <button 
          type="submit" 
          disabled={state.submitting}
          className="bg-indigo-800 hover:bg-indigo-900 text-white cursor-pointer
                     font-bold py-3 px-6 rounded-lg 
                     focus:outline-none focus:shadow-outline
                     disabled:bg-gray-400"
        >
          보내기
        </button>
      </div>
    </form>
  );
}
