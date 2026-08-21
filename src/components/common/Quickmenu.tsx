import { IMAGE_INFO } from "../../constants/ImageInfo";
import { LINK } from "../../constants/HyperLink";

export default function Quickmenu() {
  const menus = [
    { src: "/images/icons/github-mark.svg", alt: IMAGE_INFO.GITHUB_ALT, href: LINK.LINK_GITHUB },
    { src: "/images/icons/velog-mark.svg", alt: IMAGE_INFO.VELOG_ALT, href: LINK.LINK_VELOG },
    { src: "/images/icons/Naver-mark.svg", alt: IMAGE_INFO.NBLOG_ALT, href: LINK.LINK_NBLOG },
  ];

  return (
    <div className="hidden lg:block fixed left-8 bottom-8 z-10">
      <ul className="flex flex-col gap-4">
        {menus.map((menu, index) => (
          <li key={index}>
            <a
              href={menu.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center cursor-pointer rounded-full bg-surface border-0 border-line hover:bg-brand/10 hover:border-2 hover:border-brand transition-all"
            >
              <img src={menu.src} alt={menu.alt} className="w-6 h-6" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
