import { MESSAGE } from "../../../constants/Text";
// 1. [핵심 수정!] useState와 useMotionValueEvent를 import합니다.
import { motion, useTransform, useMotionValueEvent, type MotionValue } from 'framer-motion';
import { useState } from "react";

type CommentProps = {
    rotateY: MotionValue<number>;
    opacity?: MotionValue<number>; 
    x?: MotionValue<number>;
}

export default function ProfileComment({ rotateY, opacity, x }: CommentProps){

    const text1 = MESSAGE.COMMENT;
    const text2 = MESSAGE.COMMENT_FLIP_INSTRUCTION;

    // 2. [핵심 수정!]
    //    useState(text1) -> useState<string>(text1)
    //    TypeScript에게 이 state가 'text1'만이 아닌,
    //    '모든 string'을 가질 수 있다고 알려줍니다.
    const [currentText, setCurrentText] = useState<string>(text1);

    // 3. 'rotateY' 값에 따라 텍스트가 바뀌는 'commentText' (Framer Motion 값)
    const commentText = useTransform(rotateY, (latest) => {
        return latest > 90 ? text2 : text1;
    });

    // 4. [핵심 수정!]
    //    'commentText' (Framer Motion 값)가 "변경"될 때마다,
    //    'setCurrentText'를 호출하여 'currentText' (React State)를 업데이트합니다.
    useMotionValueEvent(commentText, "change", (latest) => {
        setCurrentText(latest);
    });

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
                    className="shadow-lg rounded-2xl text-center bg-white text-black"
                >
                    <span 
                        className="font-bold text-2xl md:text-4xl 
                                   leading-normal py-8 md:py-10 
                                   px-6 md:px-16 block"
                    >
                        {currentText}
                    </span>
                </motion.div>
            </motion.div>
         </>
    );
}