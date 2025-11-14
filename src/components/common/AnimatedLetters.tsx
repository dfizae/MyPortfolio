import { motion } from 'framer-motion';
import { staggerContainerVariants, letterVariants } from '../../utils/staggerContainer';

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