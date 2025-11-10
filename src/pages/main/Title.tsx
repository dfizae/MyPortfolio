import { MESSAGE } from "../../constants/Text";

export default function Title(){
    return (
        <>
            <header className="flex w-full min-h-screen items-center justify-center">
                <h1 className="font-extrabold text-8xl leading-[1.35] text-center whitespace-pre-line line-hei">
                    {MESSAGE.TITLE}
                </h1>
            </header>
        </>
    );
}