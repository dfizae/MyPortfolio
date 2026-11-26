import { MESSAGE } from "../../constants/Text";

// 데스크톱(lg 이상) 화면 모서리에 고정된 문구 (왼쪽 위, 오른쪽 아래).
// 어두운 섹션과 밝은 섹션 위를 번갈아 지나가므로 흰 글자 + mix-blend-difference (DESIGN.md §9 2026-11-26).
export default function SideText(){
    return(
        <>
            <div className = "hidden lg:flex fixed left-8 top-8 z-10 mix-blend-difference">
                <div className= "flex flex-col items-start gap-6 text-left text-surface/70">
                    <span>{MESSAGE.MY_PORTFOLIO}</span>
                </div>
            </div>
            <div className = "hidden lg:flex fixed right-8 bottom-8 z-10 mix-blend-difference">
                <div className="flex flex-col items-end gap-6 text-right text-surface/70">
                    <span>{MESSAGE.DFIZAE}</span>
                </div>
            </div>
        </>
    );
}