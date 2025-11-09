import { MESSAGE } from "../constants/Text";

export default function Header(){
    return (
        <>
            <header className="flex w-full min-h-screen items-center justify-center">
                <h1 className="font-extrabold leading-[1.35] text-8xl text-center whitespace-pre-line line-hei">
                    {MESSAGE.TITLE}
                </h1>
            </header>
        </>
    );
}