import type { Variants } from 'framer-motion';

// AnimatedLetters의 모션 값. 컨테이너가 글자를 차례로 등장시키고, 글자는 아래에서 스프링으로 올라온다.
export const staggerContainerVariants: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.3,
    },
  },
};

export const letterVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    transition: { type: 'spring', damping: 12, stiffness: 100 }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 12, stiffness: 100 }
  },
};