import { NavLink } from 'react-router'
import type { NavCategory } from '../../hooks/useNavCategories'

const LINK_CLASS =
    "relative inline-block min-w-6 whitespace-nowrap cursor-pointer font-normal text-ink hover:text-brand hover:font-bold transition-all duration-200 before:absolute before:content-[''] before:block before:bg-brand before:h-0.5 before:w-0 before:transition-all before:duration-200 hover:before:w-full before:bottom-0 before:left-0";

type GnbProps = {
    menus: string[];
    // 홈 밖(글 페이지)에서는 '/'를 붙여 홈의 해당 섹션으로 이동한다
    anchorPrefix?: string;
    // 글 분류 링크. 섹션 메뉴 뒤에 구분선을 두고 잇는다 (DESIGN.md §7)
    categories?: NavCategory[];
};

// 데스크톱(lg 이상) 위쪽 메뉴: 홈 섹션 앵커, 그 뒤에 글 분류 링크.
export default function Gnb({ menus, anchorPrefix = '', categories = [] }: GnbProps){
    return(
        <>
            <nav className="hidden lg:flex fixed right-8 top-8 z-10">
                <ul className="flex gap-6">
                    {menus.map((menu, i) => (
                        <li key={i}>
                            <a
                                href={`${anchorPrefix}#${menu.toLowerCase()}`}
                                className = {LINK_CLASS}
                            >
                                {menu}
                            </a>
                        </li>

                    ))}
                    {categories.length > 0 && <li aria-hidden="true" className="w-px self-stretch bg-line" />}
                    {categories.map((category) => (
                        <li key={category.path}>
                            <NavLink to={category.path} className={LINK_CLASS}>
                                {category.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}
