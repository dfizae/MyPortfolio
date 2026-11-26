import { motion } from 'framer-motion';
import { staggerContainerVariants, letterVariants } from '../../utils/staggerContainer';

// 글자를 하나씩 차례로 등장시키는 제목용 텍스트. '\n'은 줄바꿈으로 그린다.
const AnimatedLetters = ({ text, className }: { text: string, className?: string }) => {
  const letters = Array.from(text);
  
  return (
    <motion.div
      className={className}
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible" 
      viewport={{ once: true, amount: 0.5 }}
      aria-label={text}
    >
      {letters.map((char, index) => {
        
        if (char === '\n') {
          return <br key={index} />;
        }

        // inline-block span 안의 공백은 폭이 사라지므로 줄바꿈 없는 공백으로 바꾼다.
        const charToRender = char === ' ' ? '\u00A0' : char;

        return (
          <motion.span
            key={index}
            variants={letterVariants}
            className="inline-block"
          >
            {charToRender}
          </motion.span>
        );
      })}
    </motion.div>
  );
};

export default AnimatedLetters;