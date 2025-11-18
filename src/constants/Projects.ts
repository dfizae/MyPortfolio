export type Project = {
  name: string;
  period: string;
  logo?: string;
  mainTitle: string;
  descriptions: string[];
  skill: string[];
  links: {
    web: string;
    github: string;
    blog: string;
  };
};

const projectsData: Project[] = [
  {
    name: 'GLYF',
    period: '2025.05',
    logo: '/images/icons/glyf-logo.svg',
    mainTitle: "뷰티 브랜드 홈페이지 리뉴얼",
    descriptions: ["swiper.js 라이브러리의 다양한 기능 활용", "hover 이팩트 적극 활용"],
    skill: ['html,', 'css,', 'javascript,', 'swiper'],
    links: { web: 'http://zaero1699.dothome.co.kr/GLYF', github: 'https://github.com/dfizae/GLYF', blog: 'https://blog.naver.com/gaza1268/223878985385' }
  },
  {
    name: 'MyProtein',
    period: '2025.02',
    logo: '/images/icons/myprotein-logo.svg',
    mainTitle: "운동 보조제 회사 홈페이지 리뉴얼",
    descriptions: ["자료조사-디자인-코딩 개인 기여도 100%", "DOM 설계 적극 활용"],
    skill: ['html,', 'css,', 'javascript'],
    links: { web: 'http://zaero1699.dothome.co.kr/myprotein', github: 'https://github.com/dfizae/myprotein', blog: 'https://blog.naver.com/gaza1268/223834715153' }
  },
  {
    name: 'AstroCafe',
    period: '2024.11',
    logo: '/images/icons/astrocafe-logo.svg',
    mainTitle: "천문대 홈페이지 리뉴얼",
    descriptions: ["배너 및 슬라이드 이미지 포토샵으로 제작", "아이콘 버튼을 누르면 메뉴가 나열되는 DOM 설계"],
    skill: ['html,', 'css,', 'javascript,', 'swiper'],
    links: { web: 'http://zaero1699.dothome.co.kr/astrocafe', github: 'https://github.com/dfizae/astrocafe', blog: 'https://blog.naver.com/gaza1268/223817719666' }
  },
  {
    name: 'WaterKingdom',
    period: '2024.10',
    logo: '/images/icons/waterkingdom-icon.svg',
    mainTitle: "워터파크 홈페이지 리뉴얼",
    descriptions: ["아이콘을 포토샵으로 수작업", "quick-menu를 fixed하여 UX 강화"],
    skill: ['html,', 'css,', 'javascript,', 'swiper'],
    links: { web: 'http://zaero1699.dothome.co.kr/waterkingdom/', github: 'https://github.com/dfizae/waterkingdom', blog: 'https://blog.naver.com/gaza1268/223802055151' }
  },
];

export default projectsData;