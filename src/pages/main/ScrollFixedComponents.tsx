import Gnb from "../../components/common/Gnb";
import Quickmenu from "../../components/common/Quickmenu";
import { MESSAGE } from "../../constants/Text";
import SideText from "../../components/common/SideText";
import useNavCategories from "../../hooks/useNavCategories";

// 홈에서 스크롤과 관계없이 화면에 고정된 요소 묶음: 모서리 문구, 위쪽 메뉴, 외부 링크.
export default function ScrollFixedComponents(){
    const menus = MESSAGE.MENUS;
    const categories = useNavCategories();
    return(
        <>
            <SideText/>
            <Gnb menus = {menus} categories = {categories}/>
            <Quickmenu />
        </>
    );
}