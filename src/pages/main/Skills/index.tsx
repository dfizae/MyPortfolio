import SkillInfo from "./SkillInfo";
import AnimatedLetters from "../../../components/common/AnimatedLetters";
import LottieIcon from "../../../components/common/LottieIcon";
import skillsAnimationData from '../../../assets/lottie/skills-icon.json';

// Skills 섹션: 제목(아이콘, 글자 애니메이션)과 분류별 기술 목록.
export default function Skills(){
    return(
        <>
            <section className="w-full min-h-screen flex flex-col gap-8 lg:gap-16 justify-center items-center bg-canvas p-4 md:py-24">
                <div className="flex justify-center items-center gap-4">
                    <LottieIcon
                        animationData={skillsAnimationData}
                        className="w-20 h-20 lg:w-24 lg:h-24"
                    />

                    <AnimatedLetters 
                        text="Skills"
                        className="font-bold text-4xl lg:text-6xl text-ink text-center"
                    />
                </div>

                <div className="flex flex-col gap-4 justify-center items-center w-full max-w-6xl">
                    <SkillInfo />
                </div>
            </section>
        </>
    );
}