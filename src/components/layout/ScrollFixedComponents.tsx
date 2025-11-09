import Gnb from "../common/Gnb";
import Quickmenu from "../common/Quickmenu";
import { MESSAGE } from "../constants/Text";
import SideText from "../common/SideText";

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