import { IMAGE_INFO } from "../../constants/ImageInfo";
import { LINK } from "../../constants/HyperLink";

export default function Quickmenu() {
  const menus = [
    { src: "/images/icons/github-mark.svg", alt: IMAGE_INFO.GITHUB_ALT, href: LINK.LINK_GITHUB },
    { src: "/images/icons/velog-mark.svg", alt: IMAGE_INFO.VELOG_ALT, href: LINK.LINK_VELOG },
    { src: "/images/icons/Naver-mark.svg", alt: IMAGE_INFO.NBLOG_ALT, href: LINK.LINK_NBLOG },
  ];

  return (
    <div className="hidden lg:block fixed left-8 bottom-8">
      <ul className="flex flex-col gap-4">
        {menus.map((menu, index) => (
          <li key={index}>
            <a
              href={menu.href}
              target="_blank"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white border-0 border-slate-50 hover:bg-indigo-200 hover:border-2 hover:border-indigo-900 transition-all"
            >
              <img src={menu.src} alt={menu.alt} className="w-6 h-6" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
