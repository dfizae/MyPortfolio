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
    'Frontend': [
        { name: 'React', icon: '/images/icons/skills/React.svg' },
        { name: 'Tailwind', icon: '/images/icons/skills/Tailwind.svg' },
        { name: 'Vite', icon: '/images/icons/skills/Vite.svg' },
        { name: 'Zustand', icon: '/images/icons/skills/Zustand.svg' },
        { name: 'Next.js', icon: '/images/icons/skills/Nextjs.svg' }
    ],
    'Library': [
        { name: 'Swiper', icon:'/public/images/icons/skills/Swiper-logo.svg' },
        { name: 'Framer Motion', icon: '/public/images/icons/skills/FramerMotion-logo.svg'},
        { name: 'Lenis', icon: '/public/images/icons/skills/Lenis-logo.svg'},
        { name: 'Lottie', icon: '/public/images/icons/skills/Lottie-logo.svg'},
    ]
    ,
    'Test': [
        { name: 'JEST', icon: '/images/icons/skills/Jest.svg' },
        { name: 'RTL', icon: '/images/icons/skills/ReactTestingLibrary-icon.svg' },
    ],
    'Deployment': [
        { name: 'Vercel', icon: '/images/icons/skills/Vercel.svg' },
        { name: 'dothome', icon: '/public/images/icons/skills/dothome-logo.svg' },
    ],
    'etc': [
        { name: 'Github', icon: '/images/icons/skills/Github.svg' },
        { name: 'Figma', icon: '/images/icons/skills/Figma.svg' },
        { name: 'Photoshop', icon: '/images/icons/skills/Photoshop.svg' },
        { name: 'formspree', icon: '/images/icons/skills/formspree-icon.svg' },
    ]
};