export default function Gnb({ menus }: {menus: string[]}){
    return(
        <>
        <nav className="fixed right-[50px] top-[50px]">
            <ul className="flex gap-6">
                {menus.map((menu, i) => (
                    <li key={i} className = "inline-block min-width-[24px] whitespace-nowrap cursor-pointer font-normal text-white hover:!text-black hover:font-bold transition-all duration-200">
                        {menu}
                    </li>
                ))}
            </ul>
        </nav>
        </>
    );
}