import Gnb from "../../components/common/Gnb";
import Quickmenu from "../../components/common/Quickmenu";
import { MESSAGE } from "../../constants/Text";
import SideText from "../../components/common/SideText";

export default function ScrollFixedComponents(){
    const menus = MESSAGE.MENUS;
    return(
        <>
            <SideText/>
            <Gnb menus = {menus}/>
            <Quickmenu />
        </>
    );
}