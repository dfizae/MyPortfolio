import type { Experience } from "../../../constants/Experience";
import { IMAGE_INFO } from "../../../constants/ImageInfo";

export default function ProfileBackInfo({ experiences }: { experiences: Experience[] }){
    return(
        <>
            <div className="flex flex-col md:flex-row justify-between gap-7">
                {experiences.map((exp) =>
                    <div 
                        key={exp.name}
                        className= "w-full md:w-1/3 bg-slate-600 rounded-2xl shadow-lg"
                    >
                        <div className="flex flex-col p-5">
                            <div className="bg-slate-900 flex justify-center items-center px-10 py-1 rounded-full mb-3">
                                <h3 className="text-lg md:text-xl font-bold text-slate-100">{exp.name}</h3>
                            </div>
                            <span className="text-sm text-slate-300 border-b-2 pb-1">{exp.duration}</span>
                            <p className="text-base text-slate-100 mt-2 whitespace-pre-line">{exp.description}</p>
                            <p className="flex justify-end mt-auto pt-4">
                                {exp.link && (
                                    <a 
                                    href={exp.link} 
                                    target="_blank" 
                                    >
                                        <img src="/images/icons/github-mark.svg" alt={IMAGE_INFO.GITHUB_ALT} className="w-9 h-9 rounded-full" />
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