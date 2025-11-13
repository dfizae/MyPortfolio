import ProfileImage from "./ProfileImage";
import ProfileInfo from "./ProfileInfo";

export default function ProfileCard(){
    return(
        <>
            <div className="bg-white rounded-2xl shadow-lg 
                        flex flex-col md:flex-row
                        gap-8 md:gap-16
                        w-full max-w-6xl
                        py-12 px-8 md:px-12
                        items-center justify-center">
                    <ProfileImage />
                    <ProfileInfo />
            </div>
        </>
    );
}