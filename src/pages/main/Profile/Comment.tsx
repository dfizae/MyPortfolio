import { MESSAGE } from "../../../constants/Text";
export default function ProfileComment(){
    return(
         <>
            <div className="bg-white shadow-lg rounded-2xl max-w-5xl text-center">
                <span className="text-slate-700 font-bold text-4xl leading-normal py-6 px-26 inline-block">
                    {MESSAGE.COMMENT}
                </span>
            </div>
         </>
    );
}