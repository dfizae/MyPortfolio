interface SkillCategoryProps {
    category: string[];
    activeCategory: string;
    clickHandler: (name: string) => void;
};


export default function SkillCategory({category, activeCategory, clickHandler}: SkillCategoryProps){
    return(
        <>
            <ul className="flex shadow-lg">
                {category.map((name, i) => (
                    <li 
                        id={name} 
                        key={i} 
                        onClick={() => clickHandler(name)}
                        className={`
                            relative px-9 py-4 cursor-pointer first:rounded-l-2xl last:rounded-r-2xl text-2xl font-medium text-center
                            ${activeCategory === name 
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-black hover:bg-blue-700 hover:text-white transition-all duration-200'
                            }
                        `}
                    >{name}</li>
                ))}
            </ul>
        </>
    );
}