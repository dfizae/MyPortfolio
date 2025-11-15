import SkillBadge from "./SkillBadge";
import type { Skill } from "../../../constants/Skills";

export default function FrontendContent( { skills }: { skills: Skill[] } ){
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