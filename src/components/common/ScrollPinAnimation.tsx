import { useRef } from 'react';
import { useScroll, useTransform, type MotionValue } from 'framer-motion';

export type ProfileMotionValues = {
  commentX: MotionValue<number>;
  entryOpacity: MotionValue<number>;
  cardX: MotionValue<number>;
  rotateY: MotionValue<number>;
};

type ScrollPinAnimationProps = {
  height?: string;
  children: (values: ProfileMotionValues) => React.ReactNode;
};


export default function ScrollPinAnimation({ 
  height = '400vh',
  children 
}: ScrollPinAnimationProps) {

  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start start", "end end"]
  });

  const entryOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const commentX = useTransform(scrollYProgress, [0, 0.2], [-100, 0]);
  const cardX = useTransform(scrollYProgress, [0, 0.2], [100, 0]);
  const rotateY = useTransform(scrollYProgress, [0.5, 0.8], [0, 180]);
  
  return (
      <section 
          ref={sectionRef} 
          className="relative w-full bg-slate-200"
          style={{ height: height }}
      >
          <div className="sticky top-0 h-screen flex flex-col gap-12 justify-center items-center p-4 overflow-x-hidden perspective-[1000px]">
              {children({
                  commentX,
                  entryOpacity,
                  cardX,
                  rotateY,
              })}
          </div>
      </section>
  );
}