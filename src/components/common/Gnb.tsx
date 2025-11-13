export default function Gnb({ menus }: {menus: string[]}){
    return(
        <>
        <nav className="fixed right-8 top-8">
            <ul className="flex gap-6">
                {menus.map((menu, i) => (
                    <li key={i} 
                        className = 
                        "relative inline-block min-width-[24px] whitespace-nowrap cursor-pointer font-normal text-slate-700 hover:text-indigo-900 hover:font-bold transition-all duration-200 before:absolute before:content-[''] before:block before:bg-indigo-900 before:h-0.5 before:w-0 before:transition-all before:duration-200 hover:before:w-full before:bottom-0 before:left-0"
                    >
                        {menu}
                    </li>
                ))}
            </ul>
        </nav>
        </>
    );
}