import ContactForm from "./ContactForm";
import AnimatedLetters from "../../../components/common/AnimatedLetters";
import Lottie from "lottie-react";
import skillsAnimationData from '../../../assets/lottie/contact-icon.json';

export default function Contact(){
    return(
        <>
            <section className="w-full flex flex-col gap-8 lg:gap-16 justify-center items-center min-h-screen bg-slate-200 p-4 md:py-24">
                    <div className="flex gap-4 justify-center items-center">
                        <Lottie animationData={skillsAnimationData} 
                            loop={true} 
                            className="w-20 h-20 lg:w-24 lg:h-24" />
                        <AnimatedLetters text="Contacts" className="text-4xl md:text-6xl font-bold text-slate-900 text-center" />
                    </div>
                    <div className="w-full md:px-8 flex justify-center">
                        <ContactForm />
                </div>
             </section>
        </>
    );
}