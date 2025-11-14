import ProjectCard from "./ProjectCard";
import type { Project } from "./ProjectCard";
import AnimatedLetters from "../../../components/common/AnimatedLetters";
import Lottie from "lottie-react";
import skillsAnimationData from "../../../assets/lottie/projects-icon.json"

const projects: Project[] = [
  {
    name: 'GLYF',
    period: '2025.05',
    logo: '/images/icons/glyf-logo.svg',
    mainTitle: "뷰티 브랜드 홈페이지 리뉴얼",
    descriptions: ["설명 1", "설명 2"],
    skill: ['html, ', 'css, ', 'javascript, ', 'swiper'],
    links: { web: 'http://zaero1699.dothome.co.kr/GLYF', github: 'https://github.com/dfizae/GLYF', blog: 'https://blog.naver.com/gaza1268/223878985385' }
  },
  {
    name: 'MyProtein',
    period: '2025.02',
    logo: '/images/icons/myprotein-logo.svg',
    mainTitle: "운동 보조제 회사 홈페이지 리뉴얼",
    descriptions: ["설명 1", "설명 2"],
    skill: ['html, ', 'css, ', 'javascript'],
    links: { web: 'http://zaero1699.dothome.co.kr/myprotein', github: 'https://github.com/dfizae/myprotein', blog: 'https://blog.naver.com/gaza1268/223834715153' }
  },
  {
    name: 'AstroCafe',
    period: '2024.11',
    logo: '/images/icons/astrocafe-logo.svg',
    mainTitle: "천문대 홈페이지 리뉴얼",
    descriptions: ["설명 1", "설명 2"],
    skill: ['html, ', 'css, ', 'javascript, ', 'swiper'],
    links: { web: 'http://zaero1699.dothome.co.kr/astrocafe', github: 'https://github.com/dfizae/astrocafe', blog: 'https://blog.naver.com/gaza1268/223817719666' }
  },
  {
    name: 'WaterKingdom',
    period: '2024.10',
    logo: '/images/icons/waterkingdom-icon.svg',
    mainTitle: "워터파크 홈페이지 리뉴얼",
    descriptions: ["설명 1", "설명 2"],
    skill: ['html, ', 'css, ', 'javascript,  ', 'swiper'],
    links: { web: 'http://zaero1699.dothome.co.kr/waterkingdom/', github: 'https://github.com/dfizae/waterkingdom', blog: 'https://blog.naver.com/gaza1268/223802055151' }
  },
];

export default function Projects() {
  return (
    <>
      <section className="w-full flex flex-col gap-8 lg:gap-12 justify-center items-center p-4 md:py-24 bg-slate-200">
        <div className="flex gap-4 justify-center items-center">
          <Lottie animationData={skillsAnimationData} loop={true} className="w-20 h-20 md:w-24 md:h-24"/>
          <AnimatedLetters text="Projects" className="text-4xl lg:text-6xl font-bold text-slate-900 text-center" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-8 w-full max-w-6xl px-8">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}