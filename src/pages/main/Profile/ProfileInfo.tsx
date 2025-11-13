import { MESSAGE } from "../../../constants/Text";

export default function ProfileInfo(){
    const messages = [MESSAGE.BIRTH, MESSAGE.CERTIFICATE, MESSAGE.LOCATION, MESSAGE.PHONENUMBER, MESSAGE.EMAIL];
    return(
        <>
            <div className="w-full md:flex-1 flex flex-col justify-center text-left gap-6">
                <p className="font-bold text-2xl md:text-4xl border-b-[3px] border-slate-700 text-slate-900 pb-4">
                    {MESSAGE.NAME}
                </p>
                <ul className="flex flex-col gap-3">
                    {messages.map((message, i) => (
                        <li key={i} className="text-base md:text-2xl font-normal leading-[1.35] text-slate-700">
                            {message}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}