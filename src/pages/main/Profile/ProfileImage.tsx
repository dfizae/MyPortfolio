export default function ProfileImage() {
    return(
        <>
            <div className="w-3/4 md:w-1/3 rounded-2xl overflow-hidden">
                <img src="/images/pics/ProfilePic.png" alt="프로필 사진" className="w-full h-full object-cover" />
            </div>
        </>
    ); 
}