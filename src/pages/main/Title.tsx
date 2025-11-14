import { MESSAGE } from "../../constants/Text";

export default function Title(){
    return (
        <>
            <header className="flex w-full min-h-screen items-center justify-center bg-slate-200">
                <h1 className="font-extrabold px-4 text-5xl md:text-7xl lg:text-8xl leading-[1.35] text-center whitespace-pre-line text-slate-900">
                    <span className="whitespace-pre-line hidden md:block">
                        {MESSAGE.TITLE_DESKTOP}
                    </span>
                    <span className="whitespace-pre-line block md:hidden">
                        {MESSAGE.TITLE_MOBILE}
                    </span>
                </h1>
            </header>
        </>
    );
}