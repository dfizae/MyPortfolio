import type { Experience } from "../../../constants/Experience";
import { IMAGE_INFO } from "../../../constants/ImageInfo";

// 교육·협업 경험 카드 목록: 이름, 기간, 설명, 링크가 있으면 GitHub 아이콘.
// 어두운 면: ink 배경 + night-ink 글자, 보조는 night-muted (docs/DESIGN.md §2.1, 2026-11-26).
// 카드 제목 pill 만 brand — 브랜드 면적 규칙(§2.3) 안의 작은 면.
export default function ProfileBackInfo({ experiences }: { experiences: Experience[] }){
    return(
        <>
            <div className="flex flex-col md:flex-row justify-between gap-7">
                {experiences.map((exp) =>
                    <div
                        key={exp.name}
                        className= "w-full md:w-1/3 bg-ink text-night-ink rounded-2xl shadow-lg"
                    >
                        <div className="flex flex-col p-5">
                            <div className="bg-brand flex justify-center items-center px-10 py-1 rounded-full mb-3">
                                <h3 className="text-lg md:text-xl font-bold text-brand-ink">{exp.name}</h3>
                            </div>
                            <span className="text-sm text-night-muted border-b-2 border-night-muted/30 pb-1">{exp.duration}</span>
                            <p className="text-base text-night-ink mt-2 whitespace-pre-line">{exp.description}</p>
                            <p className="flex justify-end mt-auto pt-4">
                                {exp.link && (
                                    <a
                                    href={exp.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    >
                                        <img src="/images/icons/github-mark.svg" alt={IMAGE_INFO.GITHUB_ALT} className="w-9 h-9 rounded-full bg-surface" />
                                    </a>
                                )}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
