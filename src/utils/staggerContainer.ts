import type { Variants } from 'framer-motion';

export const staggerContainerVariants: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03, // 0.03초 간격
      delayChildren: 0.3,    // 0.3초 딜레이
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