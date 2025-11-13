import { IMAGE_INFO } from "../../constants/ImageInfo";
import { MESSAGE } from "../../constants/Text";

export default function SideText(){
    return(
        <>
            <div className = "fixed left-8 top-8">
                <div className= "flex flex-col items-start gap-[25px] text-left text-slate-700">
                    <span>{MESSAGE.MY_PORTFOLIO}</span>
                    <img src="/images/pics/pics-line-1.png" alt= { IMAGE_INFO.LINE_ALT }/>
                </div>
            </div>
            <div className = "fixed right-8 bottom-8">
                <div className="flex flex-col items-end gap-[25px] text-right text-slate-700">
                    <img src="/images/pics/pics-line-2.png" alt= { IMAGE_INFO.LINE_ALT }/>
                    <span>{MESSAGE.DFIZAE}</span>
                </div>
            </div>
        </>
    );
}