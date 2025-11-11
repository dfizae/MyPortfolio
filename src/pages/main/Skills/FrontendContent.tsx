import SkillBadge from "./SkillBadge";
import type { Skill } from "./SkillInfo";

export default function FrontendContent( { skills }: { skills: Skill[] } ){
    return(
        <>
            <div className="flex flex-wrap justify-between">
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