import ProjectCard from "./ProjectCard";
import projectsData from "../../../constants/Projects";
import AnimatedLetters from "../../../components/common/AnimatedLetters";
import Lottie from "lottie-react";
import skillsAnimationData from "../../../assets/lottie/projects-icon.json"

export default function Projects() {
  return (
    <>
      <section className="w-full flex flex-col gap-8 lg:gap-12 justify-center items-center p-4 md:py-24 bg-slate-200">
        
        <div className="flex gap-4 justify-center items-center">
            <Lottie animationData={skillsAnimationData} loop={true} className="w-20 h-20 md:w-24 md:h-24"/>
            
            <AnimatedLetters text="PROJECTS - V2 CACHE TEST" className="text-4xl lg:text-6xl font-bold text-slate-900 text-center" />
        </div>

        <h2 className="text-red-500 font-bold">Vercel 캐시 테스트 중입니다...</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-8 w-full max-w-6xl px-8">
          {projectsData.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}