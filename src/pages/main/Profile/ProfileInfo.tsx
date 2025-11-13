import { MESSAGE } from "../../../constants/Text";

export default function ProfileInfo(){
    const messages = [MESSAGE.BIRTH, MESSAGE.CERTIFICATE, MESSAGE.LOCATION, MESSAGE.PHONENUMBER, MESSAGE.EMAIL];
    return(
        <>
            <div className="w-full h-full flex flex-col justify-center text-left gap-6">
                <p className="font-bold text-2xl md:text-4xl border-b-3 border-slate-700 text-slate-900 pb-6">
                    {MESSAGE.NAME}
                </p>
                <ul className="flex flex-col gap-3">
                    {messages.map((message, i) => (
                        <li key={i} className="text-xl md:text-3xl font-normal whitespace-nowrap leading-[1.35] text-slate-700">
                            {message}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}