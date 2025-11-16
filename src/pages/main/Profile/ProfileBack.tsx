import { MESSAGE } from "../../../constants/Text";
// 1. [수정] 'experience.ts'에서 EXPERIENCES 데이터를 import
import { EXPERIENCES } from "../../../constants/Experience";
import ProfileBackInfo from "./ProfileBackInfo";

export default function ProfileBack() {
  const experiences = EXPERIENCES;

  return (
    <div className="flex flex-col text-left gap-4 w-full p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold">
        {MESSAGE.MY_DIRECTION_TITLE}
      </h2>
      <p className="text-base md:text-lg font-medium whitespace-pre-line">
        {MESSAGE.MY_DIRECTION_COMMENT}
      </p>
      <h2 className="text-xl md:text-2xl font-bold">
        {MESSAGE.MY_EXPERIENCE_TITLE}
      </h2>
      <ProfileBackInfo experiences={experiences} />
    </div>
  );
}