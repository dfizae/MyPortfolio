import ProfileCard from "./ProfileCard";
import ProfileComment from "./Comment";
import ScrollPinAnimation from '../../../components/common/ScrollPinAnimation';

// Profile 섹션: 화면에 고정된 채 한마디 카드와 프로필 카드가 들어오고, 더 내리면 카드가 뒤집힌다.
export default function Profile(){

    return(
        <>
            <ScrollPinAnimation height="400vh">
                {({ commentX, entryOpacity, cardX, rotateY }) => (
                    
                    <>
                        <ProfileComment
                            opacity={entryOpacity}
                            x={commentX}
                        />
                         
                        <ProfileCard 
                            rotateY={rotateY} 
                            opacity={entryOpacity}
                            x={cardX}
                        />
                    </>
                )}

            </ScrollPinAnimation>
        </>
    );
}