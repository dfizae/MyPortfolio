import { motion, type MotionValue } from 'framer-motion';
import ProfileImage from "./ProfileImage";
import ProfileInfo from "./ProfileInfo";
import ProfileBack from "./ProfileBack";

type ProfileCardProps = {
    rotateY: MotionValue<number>;
    opacity?: MotionValue<number>; 
    x?: MotionValue<number>;
}

export default function ProfileCard({ rotateY, opacity, x }: ProfileCardProps){
    return(
        <>
            <motion.div 
                className="relative w-full max-w-6xl h-150 md:h-118"
                style={{
                    opacity: opacity,
                    x: x,
                    rotateY: rotateY,
                    transformStyle: "preserve-3d"
                }}
            >
                <div
                    className="absolute w-full h-full bg-white rounded-2xl shadow-lg 
                               flex flex-col md:flex-row gap-8 md:gap-16 
                               py-12 px-8 md:px-12
                               items-center justify-center
                               "
                    style={{ backfaceVisibility: "hidden" }} // 뒤집혔을 때 앞면 내용을 가리는 기법
                >
                    <ProfileImage />
                    <ProfileInfo />
                </div>

                <div
                    className="absolute w-full h-full bg-white text-slate-900 
                               rounded-2xl shadow-lg overflow-y-auto
                               items-center
                               "
                    style={{ 
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)" 
                    }}
                >
                    <ProfileBack />
                </div>

            </motion.div>
        </>
    );
}