import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

type ScrollFadeInProps = {
  children: React.ReactNode;
  className?: string;

  direction?: Direction; 
  distance?: number;     
  duration?: number;     
};

const ScrollFadeIn = ({
  children,
  className,
  direction = 'up',
  distance = 20,
  duration = 0.7
}: ScrollFadeInProps) => {
  
  const controls = useAnimation();
  // threshold 0.5(요소의 50%가 동시에 보여야 등장)는 뷰포트보다 2배 이상 긴 섹션에서는
  // 영원히 충족되지 않아 opacity 0으로 남는다 (모바일 1열 Projects 섹션 미표시 원인, 2025-11-18 ~ 2026-08-21).
  // 등장 트리거는 섹션 높이에 의존하면 안 되므로 낮은 임계값 + rootMargin을 쓴다. 근거: docs/DESIGN.md §10
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px',
  });

  const getHiddenVariant = () => {
    switch (direction) {
      case 'left':
        return { opacity: 0, x: -distance };
      case 'right':
        return { opacity: 0, x: distance }; 
      case 'down':
        return { opacity: 0, y: -distance }; 
      case 'up':
      default:
        return { opacity: 0, y: distance }; 
    }
  };

  const variants = {
    hidden: getHiddenVariant(),
    visible: { opacity: 1, y: 0, x: 0 },
  };

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={controls}
      transition={{ 
        duration: duration,
        ease: "easeOut" 
      }} 
    >
      {children}
    </motion.div>
  );
};

export default ScrollFadeIn;