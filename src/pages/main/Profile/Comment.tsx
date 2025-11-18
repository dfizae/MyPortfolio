import { MESSAGE } from "../../../constants/Text";


export default function ProfileComment(){


    return(
         <>
            <div className="bg-white shadow-lg rounded-2xl w-full max-w-5xl text-center">
                <span className="text-slate-700 font-bold text-2xl md:text-4xl leading-normal py-8 md:py-10 px-6 md:px-16 inline-block">
                    {MESSAGE.COMMENT}
                </span>
            </div>
         </>
    );
}