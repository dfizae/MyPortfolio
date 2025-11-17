import { useState } from 'react'; 
import SkillCategory from "./SkillCategory";
import LanguageContent from './LanguageContent';
import FrontendContent from './FrontendContent';
import LibraryContent from './LibraryContent';
import TestContent from './TestContent';
import DeploymentContent from './DeploymentContent';
import EtcContent from './EtcContent';
import { category, skillData, type Category } from '../../../constants/Skills';




export default function SkillInfo(){
    const [activeCategory, setActiveCategory] = useState<Category>(category[0]);

    const clickHandler = (name: Category) => {
        setActiveCategory(name);
    };

    const renderContent = () => {
        const skillsForCategory = skillData[activeCategory] || [];

        switch (activeCategory) {
            case "Language":
                return <LanguageContent skills={skillsForCategory} />
            case "Frontend":
                return <FrontendContent skills={skillsForCategory} />
            case "Library":
                return <LibraryContent skills={skillsForCategory} />
            case "Test":
                return <TestContent skills={skillsForCategory} />
            case "Deployment":
                return <DeploymentContent skills={skillsForCategory} />
            case "etc":
                return <EtcContent skills={skillsForCategory} />
            default:
                return <LanguageContent skills={skillsForCategory} />
        }
    }

    return(
        <>
            <SkillCategory category={category} activeCategory={activeCategory} clickHandler={clickHandler}/>
            <div className="bg-white text-slate-700 p-6 lg:px-16 lg:py-20 rounded-2xl shadow-lg w-full border-4 border-slate-700">
                {renderContent()}
            </div>
        </>
    );
}