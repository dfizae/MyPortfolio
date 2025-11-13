import SkillInfo from "./SkillInfo";

export default function Skills(){
    return(
        <>
            <section className="w-full min-h-screen flex flex-col gap-16 justify-center items-center bg-slate-200">
                <h1 className="font-bold text-6xl text-slate-900">⚒️ Skills</h1>
                <div className="flex flex-col gap-4 justify-center items-center">
                    <SkillInfo />
                </div>
            </section>
        </>
    );
}