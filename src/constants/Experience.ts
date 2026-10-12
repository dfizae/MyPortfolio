export type Experience = {
  name: string;
  duration: string;
  description: string;
  link?: string;
};

// 제출 PDF(2026-10-06) 1쪽 「교육 / 경험」과 같은 내용. 기간은 PDF 기준.
export const EXPERIENCES: Experience[] = [
  {
    name: "SSAFY 15기",
    duration: "2026.01 - 현재",
    description: "삼성 청년 SW·AI 아카데미 비전공 자바 과정\n팀 프로젝트 냉큼 · 방방봐 · KeyFin 진행",
  },
  {
    name: "우아한테크코스 (프리코스)",
    duration: "2025.10 - 2025.11",
    description: "테스트 코드 작성, 관심사 분리,\n클린 코드 원칙, PR 피어 리뷰",
    link: "https://github.com/dfizae/woowacourse-precourse-missions.git"
  },
  {
    name: "이젠컴퓨터아카데미 - 분당",
    duration: "2024.08 - 2025.01",
    description: "웹 퍼블리싱 및 프론트엔드\n(HTML/CSS/JS/React/Figma) 과정 수료",
  },
];
