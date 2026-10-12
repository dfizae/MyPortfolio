import ProjectCard from "./ProjectCard";
import { mainProjects, publishingProjects } from "../../../constants/Projects";
import { MESSAGE } from "../../../constants/Text";
import AnimatedLetters from "../../../components/common/AnimatedLetters";
import ScrollFadeIn from "../../../components/common/ScrollFadeIn";
import Lottie from "lottie-react";
import skillsAnimationData from "../../../assets/lottie/projects-icon.json"


// 앱·웹 프로젝트를 먼저, 퍼블리싱 4종은 그 아래 묶음으로 (DESIGN.md §9 2026-10-12).
// 섹션이 뷰포트보다 훨씬 길어 등장 애니메이션은 카드 단위로 건다 (DESIGN.md §9 2026-08-21).
export default function Projects() {
  return (
    <>
      <section className="w-full flex flex-col gap-8 lg:gap-12 justify-center items-center p-4 md:py-24 bg-canvas">
        <ScrollFadeIn direction='down' className="flex gap-4 justify-center items-center">
          <Lottie animationData={skillsAnimationData} loop={true} className="w-20 h-20 md:w-24 md:h-24"/>
          <AnimatedLetters text="Projects" className="text-4xl lg:text-6xl font-bold text-ink text-center" />
        </ScrollFadeIn>
        <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-center gap-8 w-full max-w-6xl px-8">
          {mainProjects.map((project) => (
            <ScrollFadeIn key={project.name} direction='down' className="w-full flex justify-center">
              <ProjectCard project={project} />
            </ScrollFadeIn>
          ))}
        </div>

        <ScrollFadeIn direction='down' className="flex flex-col items-center gap-2 w-full max-w-6xl px-8 text-center">
          <h3 className="text-2xl font-bold text-ink">{MESSAGE.PROJECT_PUBLISHING_TITLE}</h3>
          <p className="text-ink-muted">{MESSAGE.PROJECT_PUBLISHING_DESC}</p>
        </ScrollFadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-8 w-full max-w-6xl px-8">
          {publishingProjects.map((project) => (
            <ScrollFadeIn key={project.name} direction='down' className="w-full flex justify-center">
              <ProjectCard project={project} />
            </ScrollFadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
