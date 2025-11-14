import ProfileCard from "./ProfileCard";
import ProfileComment from "./Comment";
import ScrollFadeIn from "../../../components/common/ScrollFadeIn";

export default function Profile(){
    return(
        <>
            <section className="w-full min-h-screen flex items-center justify-center bg-slate-200 md:py-24 p-4">
                <div className="w-full max-w-6xl flex items-center justify-center flex-col gap-12">
                    <ScrollFadeIn direction="left" distance={100}>
                        <ProfileComment/>
                    </ScrollFadeIn>
                   
                    <ScrollFadeIn direction="right" distance={100}>
                        <ProfileCard />
                    </ScrollFadeIn>
                </div>
            </section>
        </>
    );
}