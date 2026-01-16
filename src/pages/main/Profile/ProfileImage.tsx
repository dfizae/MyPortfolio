import { IMAGE_INFO } from "../../../constants/ImageInfo";

export default function ProfileImage() {
    return(
        <>
            <div className="w-3/4 md:w-1/3 rounded-2xl overflow-hidden">
                <img src="/images/pics/ProfilePic.jpg" alt= {IMAGE_INFO.PROFILE_ALT} className="w-full h-full object-cover" />
            </div>
        </>
    ); 
}