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

// 앱·웹 프로젝트 — 제출 PDF(2026-10-06) 2쪽과 같은 문장. 방방봐는 PDF 밖이라 git 기록(본인 커밋)으로 확인한 내용만
export const mainProjects: Project[] = [
  {
    name: 'KeyFin',
    period: '2026.08.20 - 2026.09.30',
    logo: '/images/icons/keyfin-logo.png',
    mainTitle: "이번 달 써도 되는 돈을 알려 주고, 내 방과 캐릭터로 소비 습관을 이어 가게 하는 금융 앱",
    role: "React Native (Expo) · 6인 팀에서 프론트엔드 설계·구현 담당",
    cases: [
      { problem: "홈과 목록에 값이 늦게 반영되는 문제", solution: "TanStack Query 재조회 시점을 확장" },
      { problem: "Android에서 키패드가 입력창을 덮는 문제", solution: "키보드 회피를 공용 래퍼로 전환" },
      { problem: "AI가 지킬 기준이 강제되지 않는 문제", solution: "규칙, 명세 문서, 편집 직후 검사로 구성" },
      { problem: "방이 하나씩 늦게 그려지고, 웹에서 흐리게 보이는 문제", solution: "스프라이트 미리 읽기, 대기 화면 추가" },
    ],
    skill: ['React Native', 'TypeScript', 'Expo SDK 57', 'NativeWind', 'TanStack Query', 'Zustand', 'Skia'],
    links: { github: 'https://github.com/dfizae/KeyFin', figma: 'https://www.figma.com/design/xa7rWgfvEwCLKPlvV6eFQf/KeyFin?node-id=21-5' }
  },
  {
    name: '냉큼',
    period: '2026.06.01 - 2026.07.05',
    logo: '/images/icons/naengkeum-logo.png',
    mainTitle: "냉장고 속 식재료를 관리하고, 남은 재료로 만들 수 있는 레시피를 추천하는 서비스",
    role: "Vue 3 웹 → React Native 앱 포팅 · 2인 팀, 프론트엔드 · 앱 포팅 담당",
    cases: [
      { problem: "웹의 로그인 유지를 앱에서 못 쓰는 문제", solution: "SecureStore와 메모리 보관으로 재구성" },
      { problem: "앱에서 AI 추천 응답을 못 읽는 문제", solution: "스트림 읽기를 res.text() 파싱으로 교체" },
      { problem: "소셜 로그인 뒤 앱 복귀 경로가 없는 문제", solution: "app_redirect와 허용 스킴 검사를 추가" },
    ],
    skill: ['Vue 3', 'Pinia', 'React Native', 'Expo SDK 51', 'React Navigation', 'Zustand', 'Axios'],
    links: { github: 'https://github.com/dfizae/naengkeum' }
  },
  {
    name: '방방봐',
    period: '2026.07.15 - 2026.08.09',
    logo: '/images/icons/bangbangbwa-logo.png',
    mainTitle: "공인중개사와 실시간 화상으로 매물을 확인하고, 체크리스트와 AI 리포트로 기록을 남기는 비대면 부동산 투어 웹 서비스",
    role: "React 웹 · 6인 팀(프론트엔드 3명) · 매물 지도, TURN 서버 구성, AI 프레임 전송, 체크리스트 연동 담당",
    cases: [
      { problem: "모바일·사내망에서 화상 연결이 실패하는 문제", solution: "coturn TURN 서버 구성, ICE 설정을 환경변수로 주입" },
      { problem: "통화를 방해하지 않고 영상으로 AI 하자 탐지를 해야 하는 문제", solution: "프레임을 JPEG로 주기 전송, 이전 요청 중이면 건너뜀" },
      { problem: "지도 영역 크기가 바뀌면 빈 지도가 나오는 문제", solution: "ResizeObserver와 requestAnimationFrame으로 다시 그리기" },
    ],
    skill: ['React', 'TypeScript', 'TanStack Query', 'Zustand', 'Tailwind', 'Kakao Map', 'WebRTC'],
    links: { github: 'https://github.com/dfizae/bangbangbwa' }
  },
];

// 웹 퍼블리싱 작업 — 아래 작은 묶음으로 보여 준다 (DESIGN.md §9 2026-10-12)
export const publishingProjects: Project[] = [
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
