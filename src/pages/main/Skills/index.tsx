import SkillInfo from "./SkillInfo";

export default function Skills(){
    return(
        <>
            <section className="w-full min-h-screen flex flex-col gap-8 lg:gap-16 justify-center items-center bg-slate-200 p-4 md:py-24">
                <h1 className="font-bold text-4xl lg:text-6xl text-slate-900 text-center">⚒️ Skills</h1>
                <div className="flex flex-col gap-4 justify-center items-center w-full max-w-6xl">
                    <SkillInfo />
                </div>
            </section>
        </>
    );
}