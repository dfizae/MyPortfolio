export type Experience = {
  name: string;
  duration: string;
  description: string;
  link?: string;
};

export const EXPERIENCES: Experience[] = [
  {
    name: "우아한테크코스 (프리코스)",
    duration: "2025.10 - 2025.11",
    description: "테스트 코드 작성, 관심사 분리,\n클린 코드 원칙 학습",
    link: "https://github.com/woowacourse/javascript-pre-course"
  },
  {
    name: "feeple (팀 프로젝트)",
    duration: "2025.08 - 2025.10",
    description: "예술 피드백 커뮤니티 사이트\nReact 기반 대학생 협업",
    link: "https://github.com/dfizae/feeple"
  },
  {
    name: "이젠컴퓨터아카데미 - 분당",
    duration: "2024.09 - 2025.03",
    description: "웹 퍼블리싱 및 프론트엔드 (HTML/CSS/JS/React)\n 과정 수료",
  },
];