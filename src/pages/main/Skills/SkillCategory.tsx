import type { Category } from "../../../constants/Skills";

interface SkillCategoryProps {
    category: readonly Category[];
    activeCategory: string;
    clickHandler: (name: Category) => void;
};


export default function SkillCategory({category, activeCategory, clickHandler}: SkillCategoryProps){
    return(
        <>
           <div className="w-full max-w-full overflow-x-auto text-center bg-white rounded-full shadow-lg p-2">
                <ul className="inline-flex gap-6 pr-2">
                    {category.map((name, i) => (
                        <li 
                            id={name} 
                            key={i} 
                            onClick={() => clickHandler(name)}
                            className={`
                                relative px-5 py-3 lg:px-9 lg:py-4 cursor-pointer rounded-full 
                                text-base lg:text-2xl font-medium text-center whitespace-nowrap
                                ${activeCategory === name 
                                    ? 'bg-indigo-800 text-white'
                                    : 'bg-white text-slate-700 hover:bg-indigo-900 hover:text-white transition-all duration-200'
                                }
                            `}
                        >{name}</li>
                    ))}
                </ul>
           </div>
        </>
    );
}