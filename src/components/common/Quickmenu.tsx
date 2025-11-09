import { IMAGE_INFO } from "../constants/ImageInfo";
import { LINK } from "../constants/HyperLink";

export default function Quickmenu() {
  const menus = [
    { src: "/src/images/icons/github-mark.svg", alt: IMAGE_INFO.GITHUB_ALT, href: LINK.LINK_GITHUB },
    { src: "/src/images/icons/velog-mark.svg", alt: IMAGE_INFO.VELOG_ALT, href: LINK.LINK_VELOG },
    { src: "/src/images/icons/Naver-mark.svg", alt: IMAGE_INFO.NBLOG_ALT, href: LINK.LINK_NBLOG },
  ];

  return (
    <div className="fixed left-[50px] bottom-[50px]">
      <ul className="flex flex-col gap-4">
        {menus.map((menu, index) => (
          <li key={index}>
            <a
              href={menu.href}
              target="_blank"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              <img src={menu.src} alt={menu.alt} className="w-6 h-6" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
