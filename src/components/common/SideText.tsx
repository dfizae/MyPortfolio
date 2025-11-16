import { MESSAGE } from "../../constants/Text";

export default function SideText(){
    return(
        <>
            <div className = "hidden lg:flex fixed left-8 top-8 z-10">
                <div className= "flex flex-col items-start gap-6 text-left text-slate-700">
                    <span>{MESSAGE.MY_PORTFOLIO}</span>
                </div>
            </div>
            <div className = "hidden lg:flex fixed right-8 bottom-8 z-10">
                <div className="flex flex-col items-end gap-6 text-right text-slate-700">
                    <span>{MESSAGE.DFIZAE}</span>
                </div>
            </div>
        </>
    );
}