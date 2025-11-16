import ProfileCard from "./ProfileCard";
import ProfileComment from "./Comment";
import ScrollPinAnimation from '../../../components/common/ScrollPinAnimation';

export default function Profile(){

    return(
        <>
            <ScrollPinAnimation height="400vh">
                {({ commentX, entryOpacity, cardX, rotateY }) => (
                    
                    <>
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