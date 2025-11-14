import SkillInfo from "./SkillInfo";
import AnimatedLetters from "../../../components/common/AnimatedLetters";
import Lottie from 'lottie-react';
import skillsAnimationData from '../../../assets/lottie/skills-icon.json';

export default function Skills(){
    return(
        <>
            <section className="w-full min-h-screen flex flex-col gap-8 lg:gap-16 justify-center items-center bg-slate-200 p-4 md:py-24">
                <div className="flex justify-center items-center gap-4">
                    <Lottie 
                        animationData={skillsAnimationData} 
                        loop={true} 
                        className="w-20 h-20 lg:w-24 lg:h-24"
                    />

                    <AnimatedLetters 
                        text="Skills"
                        className="font-bold text-4xl lg:text-6xl text-slate-900 text-center"
                    />
                </div>

                <div className="flex flex-col gap-4 justify-center items-center w-full max-w-6xl">
                    <SkillInfo />
                </div>
            </section>
        </>
    );
}