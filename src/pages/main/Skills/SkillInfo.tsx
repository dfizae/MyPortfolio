import { useState } from 'react'; 
import SkillCategory from "./SkillCategory";
import LanguageContent from './LanguageContent';
import FrontendContent from './FrontendContent';
import TestContent from './TestContent';
import DeploymentContent from './DeploymentContent';
import EtcContent from './EtcContent';

export type Skill = {
  name: string;
  icon: string;
};

const category = ['Language', 'Frontend', "Test", "Deployment", "etc"];

const skillData: Record<string, Skill[]> = {
    'Language': [
        { name: 'HTML', icon: '/images/icons/skills/Html-icon.png' },
        { name: 'CSS', icon: '/images/icons/skills/Css-icon.png' },
        { name: 'Javascript', icon: '/images/icons/skills/JS-icon.png' },
        { name: 'Typescript', icon: '/images/icons/skills/TS-icon.png' }
    ],
    'Frontend': [
        { name: 'React', icon: '/images/icons/skills/React.svg' },
        { name: 'TailwindCSS', icon: '/images/icons/skills/Tailwind.svg' },
        { name: 'Vite', icon: '/images/icons/skills/Vite.svg' },
        { name: 'Zustand', icon: '/images/icons/skills/Zustand.svg' },
        { name: 'Next.js', icon: '/images/icons/skills/Nextjs.svg' }
    ],
    'Test': [{ name: 'JEST', icon: '/images/icons/skills/Jest.svg' }],
    'Deployment': [{ name: 'Vercel', icon: '/images/icons/skills/Vercel.svg' }],
    'etc': [
        { name: 'Github', icon: '/images/icons/skills/Github.svg' },
        { name: 'Figma', icon: '/images/icons/skills/Figma.svg' },
        { name: 'Photoshop', icon: '/images/icons/skills/Photoshop.svg' }
    ]
};

export default function SkillInfo(){
    const [activeCategory, setActiveCategory] = useState(category[0]);

    const clickHandler = (name: string) => {
        setActiveCategory(name);
    };

    const renderContent = () => {
        const skillsForCategory = skillData[activeCategory as keyof typeof skillData] || [];

        switch (activeCategory) {
            case "Language":
                return <LanguageContent skills={skillsForCategory} />
            case "Frontend":
                return <FrontendContent skills={skillsForCategory} />
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
            <div className="bg-white text-slate-700 px-16 py-20 rounded-2xl shadow-lg w-full border-4 border-slate-700">
                {renderContent()}
            </div>
        </>
    );
}