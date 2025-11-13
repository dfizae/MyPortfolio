import ProfileCard from "./ProfileCard";
import ProfileComment from "./Comment";

export default function Profile(){
    return(
        <>
            <section className="w-full min-h-screen flex items-center justify-center bg-slate-200">
                <div className="flex items-center justify-between flex-col gap-8">
                    <ProfileComment/>
                    <ProfileCard />
                </div>
            </section>
        </>
    );
}