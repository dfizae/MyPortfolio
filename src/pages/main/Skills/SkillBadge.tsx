export default function SkillBadge(props: { name: string, icon: string }){
    return(
        <div className="flex items-center flex-col gap-8 bg-slate-200 rounded-lg px-4 py-2 shadow-lg">
            <img 
                src={props.icon}
                alt={`${props.name} 로고`} 
                className="w-21 h-21"
            />
            <span className="font-medium text-slate-700">
                {props.name}
            </span>
        </div>
    );
}