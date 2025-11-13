import SkillBadge from "./SkillBadge";
import type { Skill } from "./SkillInfo";

export default function LanguageContent( { skills }: { skills: Skill[] } ){
    return(
        <>
            <div className="flex flex-wrap justify-center lg:justify-between gap-4">
                {skills.map((skill) => (
                    <SkillBadge 
                        key={skill.name} 
                        name={skill.name}  
                        icon={skill.icon}
                    />
                ))}
            </div>
        </>
    );
}