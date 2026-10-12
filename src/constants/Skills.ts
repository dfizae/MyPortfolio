export type Skill = {
  name: string;
  icon: string;
};

export const category = ['Language', 'Frontend', "Library", "Test", "Deployment", "etc"] as const;
export type Category = typeof category[number];

export const skillData: Record<Category, Skill[]> = {
    'Language': [
        { name: 'HTML', icon: '/images/icons/skills/Html-icon.png' },
        { name: 'CSS', icon: '/images/icons/skills/Css-icon.png' },
        { name: 'Javascript', icon: '/images/icons/skills/JS-icon.png' },
        { name: 'Typescript', icon: '/images/icons/skills/TS-icon.png' }
    ],
    // 제출 PDF(2026-10-06) 1쪽 기술스킬 기준. 근거가 없는 Next.js는 2026-10-12 삭제
    // 아이콘 출처: Expo · Pinia · TanStack Query · Vitest는 simple-icons(CC0), Vue 로고는 Evan You(CC BY-NC-SA 4.0)
    'Frontend': [
        { name: 'React', icon: '/images/icons/skills/React.svg' },
        { name: 'React Native', icon: '/images/icons/skills/React.svg' },
        { name: 'Expo', icon: '/images/icons/skills/Expo.svg' },
        { name: 'Vue', icon: '/images/icons/skills/Vue.svg' },
        { name: 'Tailwind / NativeWind', icon: '/images/icons/skills/Tailwind.svg' },
        { name: 'Vite', icon: '/images/icons/skills/Vite.svg' },
        { name: 'Zustand', icon: '/images/icons/skills/Zustand.svg' },
        { name: 'Pinia', icon: '/images/icons/skills/Pinia.svg' }
    ],
    'Library': [
        { name: 'TanStack Query', icon: '/images/icons/skills/TanStackQuery.svg' },
        { name: 'Swiper', icon:'/images/icons/skills/Swiper-logo.svg' },
        { name: 'Framer Motion', icon: '/images/icons/skills/FramerMotion-logo.svg'},
        { name: 'Lenis', icon: '/images/icons/skills/Lenis-logo.svg'},
        { name: 'Lottie', icon: '/images/icons/skills/Lottie-logo.svg'},
    ]
    ,
    'Test': [
        { name: 'JEST', icon: '/images/icons/skills/Jest.svg' },
        { name: 'RTL', icon: '/images/icons/skills/ReactTestingLibrary-icon.svg' },
        { name: 'Vitest', icon: '/images/icons/skills/Vitest.svg' },
    ],
    'Deployment': [
        { name: 'Vercel', icon: '/images/icons/skills/Vercel.svg' },
        { name: 'dothome', icon: '/images/icons/skills/dothome-logo.svg' },
    ],
    'etc': [
        { name: 'Github', icon: '/images/icons/skills/Github.svg' },
        { name: 'Figma', icon: '/images/icons/skills/Figma.svg' },
        { name: 'Photoshop', icon: '/images/icons/skills/Photoshop.svg' },
        { name: 'formspree', icon: '/images/icons/skills/formspree-icon.svg' },
    ]
};