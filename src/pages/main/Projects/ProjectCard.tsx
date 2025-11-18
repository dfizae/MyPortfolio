import type { Project } from "../../../constants/Projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-white flex flex-col p-6 md:p-8 rounded-2xl shadow-lg w-full md:max-w-md text-slate-700">
      <div className="flex justify-between items-center mb-2">
        <span className="text-2xl font-bold text-slate-900">{project.name}</span>
        {project.logo && (
          <img src={project.logo} alt={`${project.name} 로고`} className="w-10 h-10" />
        )}
      </div>
      <div className="border-b-2 border-slate-300 pb-2 mb-4">
        <span className="text-sm text-slate-600">{project.period}</span>
      </div>
      <div className="mb-4">
        <span className="text-lg font-semibold">{project.mainTitle}</span>
        <ul className="list-disc list-inside mt-2 text-slate-700">
          {project.descriptions.map((desc, i) => (
            <li key={i}>{desc}</li>
          ))}
        </ul>
      </div>


      <div className="flex flex-col md:flex-row justify-between gap-4 mt-auto pt-4 border-t border-slate-300">
        <p className="flex justify-center items-center bg-indigo-800 text-slate-50 rounded-lg">
          <span className="font-normal text-sm py-1 px-4">{project.skill.join(" ")}</span>
        </p>

        <ul className="flex gap-5 justify-end items-center">
          <li>
            <a href={project.links.web} target="_blank" rel="noopener noreferrer">
                <img src="/images/icons/website-mark.svg" alt="웹사이트 아이콘" className="w-5 h-5"/>
            </a>
          </li>
          <li>
            <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                <img src="/images/icons/github-mark.svg" alt="깃허브 아이콘" className="w-5 h-5"/>
            </a>
          </li>
          <li>
            <a href={project.links.blog} target="_blank" rel="noopener noreferrer">
                <img src="/images/icons/Naver-mark.svg" alt="블로그 아이콘" className="w-5 h-5"/>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}