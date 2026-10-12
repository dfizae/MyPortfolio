import type { Project, ProjectLinks } from "../../../constants/Projects";
import { MESSAGE } from "../../../constants/Text";
import { IMAGE_INFO } from "../../../constants/ImageInfo";

// 링크 아이콘 순서. 값이 있는 링크만 그린다 (DESIGN.md §9 2026-10-12).
const LINK_ICONS: { key: keyof ProjectLinks; icon: string; alt: string }[] = [
  { key: "github", icon: "/images/icons/github-mark.svg", alt: IMAGE_INFO.PROJECT_GITHUB_ALT },
  { key: "figma", icon: "/images/icons/skills/Figma.svg", alt: IMAGE_INFO.PROJECT_FIGMA_ALT },
  { key: "web", icon: "/images/icons/website-mark.svg", alt: IMAGE_INFO.PROJECT_WEB_ALT },
  { key: "blog", icon: "/images/icons/Naver-mark.svg", alt: IMAGE_INFO.PROJECT_BLOG_ALT },
];

export default function ProjectCard({ project }: { project: Project }) {
  const descriptions = project.descriptions ?? [];
  const cases = project.cases ?? [];
  const links = LINK_ICONS.filter(({ key }) => project.links[key]);

  return (
    <div className="bg-surface flex flex-col p-6 md:p-8 rounded-2xl shadow-lg w-full md:max-w-md text-ink">
      <div className="flex justify-between items-center mb-2">
        <span className="text-2xl font-bold text-ink">{project.name}</span>
        {project.logo && (
          <img src={project.logo} alt={`${project.name} 로고`} className="w-10 h-10" />
        )}
      </div>
      <div className="border-b-2 border-line pb-2 mb-4">
        <span className="text-sm text-ink-muted">{project.period}</span>
      </div>
      <div className="mb-4">
        <span className="text-lg font-semibold">{project.mainTitle}</span>
        {project.role && (
          <p className="text-sm text-ink-muted mt-1">{project.role}</p>
        )}
        {descriptions.length > 0 && (
          <ul className="list-disc list-inside mt-2 text-ink">
            {descriptions.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
        )}
      </div>

      {cases.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-bold text-brand">{MESSAGE.PROJECT_CASES_TITLE}</p>
          <ol className="mt-2 flex flex-col">
            {cases.map((c, i) => (
              <li key={i} className="flex gap-2 py-2 border-t border-line first:border-t-0">
                <span className="font-bold text-brand">{i + 1}.</span>
                <div>
                  <p className="text-sm text-ink-muted">{c.problem}</p>
                  <p className="font-semibold text-ink">{c.solution}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="flex flex-col gap-4 mt-auto pt-4 border-t border-line">
        <ul className="flex flex-wrap gap-2" aria-label={MESSAGE.PROJECT_STACK}>
          {project.skill.map((skill) => (
            <li key={skill} className="bg-canvas text-ink rounded-lg text-sm px-3 py-1">
              {skill}
            </li>
          ))}
        </ul>

        {links.length > 0 && (
          <ul className="flex gap-5 justify-end items-center">
            {links.map(({ key, icon, alt }) => (
              <li key={key}>
                <a href={project.links[key]} target="_blank" rel="noopener noreferrer">
                  <img src={icon} alt={alt} className="w-5 h-5" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
