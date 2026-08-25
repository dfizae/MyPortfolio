import { useState } from 'react'; 
import SkillCategory from "./SkillCategory";
import { category, skillData, type Category } from '../../../constants/Skills';
import SkillContentDisplay from './SkillContentDisplay';




export default function SkillInfo(){
    const [activeCategory, setActiveCategory] = useState<Category>(category[0]);

    const clickHandler = (name: Category) => {
        setActiveCategory(name);
    };

const renderContent = () => {
        const skillsForCategory = skillData[activeCategory] || [];
        return <SkillContentDisplay skills={skillsForCategory} />;
    }

    return(
        <>
            <SkillCategory category={category} activeCategory={activeCategory} clickHandler={clickHandler}/>
            <div className="bg-surface text-ink p-6 lg:px-16 lg:py-20 rounded-2xl shadow-lg w-full">
                {renderContent()}
            </div>
        </>
    );
}