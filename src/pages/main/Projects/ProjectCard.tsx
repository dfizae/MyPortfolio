export type Project = {
  name: string;
  period: string;
  logo?: string;
  mainTitle: string;
  descriptions: string[];
  skill: string[];
  links: {
    web: string;
    github: string;
    blog: string;
  };
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-[#D4D4D4] flex flex-col p-6 rounded-lg shadow-lg w-full max-w-md text-black">
      <div className="flex justify-between items-center mb-2">
        <span className="text-2xl font-bold">{project.name}</span>
        {project.logo && (
          <img src={project.logo} alt={`${project.name} 로고`} className="w-10 h-10" />
        )}
      </div>

      <div className="border-b-2 border-gray-500 pb-2 mb-4">
        <span className="text-sm text-gray-700">{project.period}</span>
      </div>

      <div className="mb-4">
        <span className="text-lg font-semibold">{project.mainTitle}</span>
        <ul className="list-disc list-inside mt-2">
          {project.descriptions.map((desc, i) => (
            <li key={i}>{desc}</li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between mt-auto pt-4 border-t border-gray-500">
        <p className="flex justify-center bg-[#848484] rounded-lg">
          <span className="font-normal text-sm py-1 px-4">{project.skill}</span>
        </p>
        <ul className="flex gap-5 justify-end items-center">
          <li>
            <a href={project.links.web} target="_blank">
                <img src="/src/images/icons/website-mark.svg" alt="웹사이트 아이콘" className="w-5 h-5"/>
            </a>
          </li>
          <li>
            <a href={project.links.github} target="_blank">
                <img src="/src/images/icons/github-mark.svg" alt="깃허브 아이콘" className="w-5 h-5"/>
            </a>
          </li>
          <li>
            <a href={project.links.blog} target="_blank">
                <img src="/src/images/icons/Naver-mark.svg" alt="블로그 아이콘" className="w-5 h-5"/>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}