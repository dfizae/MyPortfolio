interface SkillCategoryProps {
    category: string[];
    activeCategory: string;
    clickHandler: (name: string) => void;
};


export default function SkillCategory({category, activeCategory, clickHandler}: SkillCategoryProps){
    return(
        <>
            <ul className="flex shadow-lg bg-white rounded-full">
                {category.map((name, i) => (
                    <li 
                        id={name} 
                        key={i} 
                        onClick={() => clickHandler(name)}
                        className={`
                            px-9 py-4 m-2 cursor-pointer rounded-full text-2xl font-medium text-center
                            ${activeCategory === name 
                                ? 'bg-indigo-800 text-white'
                                : 'bg-white text-slate-700 hover:bg-indigo-900 hover:text-white transition-all duration-200'
                            }
                        `}
                    >{name}</li>
                ))}
            </ul>
        </>
    );
}