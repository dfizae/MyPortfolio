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
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
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