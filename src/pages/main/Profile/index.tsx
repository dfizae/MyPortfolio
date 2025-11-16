import ProfileCard from "./ProfileCard";
import ProfileComment from "./Comment";
import ScrollPinAnimation from '../../../components/common/ScrollPinAnimation';

export default function Profile(){

    return(
        <>
            <ScrollPinAnimation height="400vh">
                
                {/* 1. [수정] 'commentCombinedOpacity'를 받지 않습니다. */}
                {({ commentX, entryOpacity, cardX, rotateY }) => (
                    
                    <>
                        {/* 2. [수정] ProfileComment가 
                               'rotateY' (텍스트 교체용),
                               'entryOpacity' (등장용),
                               'commentX' (등장용)
                               3개의 값을 받도록 합니다.
                        */}
                        <ProfileComment
                            rotateY={rotateY}
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