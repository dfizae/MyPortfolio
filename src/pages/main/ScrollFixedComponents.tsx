import Gnb from "../../components/common/Gnb";
import Quickmenu from "../../components/common/Quickmenu";
import { MESSAGE } from "../../constants/Text";
import SideText from "../../components/common/SideText";
import useNavCategories from "../../hooks/useNavCategories";

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