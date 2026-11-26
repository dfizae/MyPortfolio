import { MESSAGE } from "../../constants/Text";
import AnimatedLetters from "../../components/common/AnimatedLetters";

// 첫 화면 제목. 모바일과 md 이상은 줄바꿈이 다른 문구를 쓴다.
export default function Title(){
    const commonClasses = "font-extrabold text-center text-ink leading-[1.35] px-4";
    
    return (
        <>
            <header className="flex w-full min-h-screen items-center justify-center bg-canvas">
                <div className="block md:hidden">
                    <AnimatedLetters 
                        text={MESSAGE.TITLE_MOBILE}
                        className={`${commonClasses} text-5xl`} 
                    />
                </div>
                <div className="hidden md:block">
                    <AnimatedLetters 
                        text={MESSAGE.TITLE_DESKTOP}
                        className={`${commonClasses} text-4xl lg:text-6xl`}
                    />
                </div>
                
            </header>
        </>
    );
}