export type ProjectLinks = {
  github?: string;
  figma?: string;
  web?: string;
  blog?: string;
};

export type ProjectCase = {
  problem: string;
  solution: string;
};

export type Project = {
  name: string;
  period: string;
  logo?: string;
  mainTitle: string;
  role?: string;           // 형태 · 인원 · 맡은 일 한 줄
  descriptions?: string[]; // 작업 포인트 (퍼블리싱 카드)
  cases?: ProjectCase[];   // 문제 → 해결 (앱·웹 프로젝트 카드)
  skill: string[];
  links: ProjectLinks;     // 값이 있는 링크만 아이콘으로 그린다 (DESIGN.md §9 2026-10-12)
};

const projectsData: Project[] = [
  {
    name: 'GLYF',
    period: '2025.05',
    logo: '/images/icons/glyf-logo.svg',
    mainTitle: "뷰티 브랜드 홈페이지 리뉴얼",
    descriptions: ["swiper.js 적극 활용", "hover 이팩트 적극 활용"],
    skill: ['HTML', 'CSS', 'JavaScript', 'Swiper'],
    links: { web: 'http://zaero1699.dothome.co.kr/GLYF', github: 'https://github.com/dfizae/GLYF', blog: 'https://blog.naver.com/gaza1268/223878985385' }
  },
  {
    name: 'MyProtein',
    period: '2025.02',
    logo: '/images/icons/myprotein-logo.svg',
    mainTitle: "운동 보조제 회사 홈페이지 리뉴얼",
    descriptions: ["애니메이션 css 활용", "DOM 설계 적극 활용"],
    skill: ['HTML', 'CSS', 'JavaScript'],
    links: { web: 'http://zaero1699.dothome.co.kr/myprotein', github: 'https://github.com/dfizae/myprotein', blog: 'https://blog.naver.com/gaza1268/223834715153' }
  },
  {
    name: 'AstroCafe',
    period: '2024.11',
    logo: '/images/icons/astrocafe-logo.svg',
    mainTitle: "천문대 홈페이지 리뉴얼",
    descriptions: ["배너 및 슬라이드 이미지 포토샵 제작", "버튼 DOM 설계"],
    skill: ['HTML', 'CSS', 'JavaScript', 'Swiper'],
    links: { web: 'http://zaero1699.dothome.co.kr/astrocafe', github: 'https://github.com/dfizae/astrocafe', blog: 'https://blog.naver.com/gaza1268/223817719666' }
  },
  {
    name: 'WaterKingdom',
    period: '2024.10',
    logo: '/images/icons/waterkingdom-icon.svg',
    mainTitle: "워터파크 홈페이지 리뉴얼",
    descriptions: ["아이콘을 포토샵으로 수작업", "quick-menu를 fixed 설계"],
    skill: ['HTML', 'CSS', 'JavaScript', 'Swiper'],
    links: { web: 'http://zaero1699.dothome.co.kr/waterkingdom/', github: 'https://github.com/dfizae/waterkingdom', blog: 'https://blog.naver.com/gaza1268/223802055151' }
  },
];

export default projectsData;