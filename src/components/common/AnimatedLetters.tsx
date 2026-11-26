import { motion } from 'framer-motion';
import { staggerContainerVariants, letterVariants } from '../../utils/staggerContainer';

type AnimatedLettersProps = {
  text: string;
  className?: string;
  // text 안에서 highlightClassName을 입힐 낱말
  highlights?: string[];
  highlightClassName?: string;
};

// 강조할 낱말들이 letters에서 차지하는 위치를 모은다.
function findHighlightedIndexes(letters: string[], highlights: string[]): Set<number> {
  const indexes = new Set<number>();
  for (const word of highlights) {
    const wordLetters = Array.from(word);
    for (let start = 0; start + wordLetters.length <= letters.length; start++) {
      const isMatch = wordLetters.every((char, offset) => letters[start + offset] === char);
      if (isMatch) wordLetters.forEach((_, offset) => indexes.add(start + offset));
    }
  }
  return indexes;
}

// 글자를 하나씩 차례로 등장시키는 제목용 텍스트. '\n'은 줄바꿈으로 그린다.
const AnimatedLetters = ({ text, className, highlights = [], highlightClassName = '' }: AnimatedLettersProps) => {
  const letters = Array.from(text);
  const highlightedIndexes = findHighlightedIndexes(letters, highlights);
  
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
            className={highlightedIndexes.has(index) ? `inline-block ${highlightClassName}` : 'inline-block'}
          >
            {charToRender}
          </motion.span>
        );
      })}
    </motion.div>
  );
};

export default AnimatedLetters;