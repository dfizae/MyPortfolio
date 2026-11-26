import { MESSAGE } from "../../../constants/Text";

// 프로필 카드 앞면의 기본 정보: 이름, 학력, 연락처, 이메일.
export default function ProfileInfo(){
    const messages = [MESSAGE.CERTIFICATE, MESSAGE.PHONENUMBER, MESSAGE.EMAIL];
    return(
        <>
            <div className="w-full md:flex-1 flex flex-col justify-center text-left gap-6">
                <p className="font-bold text-2xl md:text-4xl border-b-[3px] border-line text-ink pb-4">
                    {MESSAGE.NAME}
                </p>
                <ul className="flex flex-col gap-3">
                    {messages.map((message, i) => (
                        <li key={i} className="text-base md:text-2xl font-normal leading-[1.35] text-ink">
                            {message}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}