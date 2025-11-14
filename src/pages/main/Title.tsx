import { MESSAGE } from "../../constants/Text";
import AnimatedLetters from "../../components/common/AnimatedLetters";

export default function Title(){
    const commonClasses = "font-extrabold text-center text-slate-900 leading-[1.35] px-4";
    
    return (
        <>
            <header className="flex w-full min-h-screen items-center justify-center bg-slate-200">
                <div className="block md:hidden">
                    <AnimatedLetters 
                        text={MESSAGE.TITLE_MOBILE}
                        className={`${commonClasses} text-5xl`} 
                    />
                </div>
                <div className="hidden md:block">
                    <AnimatedLetters 
                        text={MESSAGE.TITLE_DESKTOP}
                        className={`${commonClasses} text-7xl lg:text-8xl`}
                    />
                </div>
                
            </header>
        </>
    );
}