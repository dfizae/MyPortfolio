import { MESSAGE } from "../../../constants/Text";
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
    const [currentText, setCurrentText] = useState<string>(text1);

    const commentText = useTransform(rotateY, (latest) => {
        return latest > 90 ? text2 : text1;
    });

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