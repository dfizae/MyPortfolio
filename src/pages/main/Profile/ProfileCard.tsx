import ProfileImage from "./ProfileImage";
import ProfileInfo from "./ProfileInfo";

export default function ProfileCard(){
    return(
        <>
            <div className="bg-white rounded-2xl shadow-lg 
                        flex  
                        flex-col
                        py-12 px-11">
                <div className="flex flex-row gap-16 justify-center items-center">
                    <ProfileImage />
                    <ProfileInfo />
                </div>
            </div>
        </>
    );
}