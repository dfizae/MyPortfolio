import { MESSAGE } from "../../constants/Text";

// 데스크톱(lg 이상) 화면 모서리에 고정된 문구 (왼쪽 위, 오른쪽 아래).
export default function SideText(){
    return(
        <>
            <div className = "hidden lg:flex fixed left-8 top-8 z-10">
                <div className= "flex flex-col items-start gap-6 text-left text-ink-muted">
                    <span>{MESSAGE.MY_PORTFOLIO}</span>
                </div>
            </div>
            <div className = "hidden lg:flex fixed right-8 bottom-8 z-10">
                <div className="flex flex-col items-end gap-6 text-right text-ink-muted">
                    <span>{MESSAGE.DFIZAE}</span>
                </div>
            </div>
        </>
    );
}