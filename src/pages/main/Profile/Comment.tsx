import { MESSAGE } from "../../../constants/Text";
import { motion, type MotionValue } from 'framer-motion';

type CommentProps = {
    opacity?: MotionValue<number>; 
    x?: MotionValue<number>;
}

// Profile 섹션 위쪽의 한마디 카드. 스크롤 값(opacity, x)을 받아 왼쪽에서 들어온다.
export default function ProfileComment({ opacity, x }: CommentProps){

    return(
         <>
            <motion.div 
                className="w-full max-w-6xl"
                style={{
                    opacity: opacity,
                    x: x,
                }}
            >
                <motion.div 
                    className="shadow-lg rounded-2xl text-center bg-surface text-ink"
                >
                    <span 
                        className="font-bold text-2xl md:text-3xl 
                                   leading-normal py-8 md:py-10 whitespace-pre-line 
                                   px-6 md:px-16 block"
                    >
                        {MESSAGE.COMMENT}
                    </span>
                </motion.div>
            </motion.div>
         </>
    );
}