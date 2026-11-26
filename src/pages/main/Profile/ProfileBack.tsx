import { MESSAGE } from "../../../constants/Text";
import { EXPERIENCES } from "../../../constants/Experience";
import ProfileBackInfo from "./ProfileBackInfo";

// 프로필 카드 뒷면: 개발자로서의 방향과 교육·협업 경험.
export default function ProfileBack() {
  const experiences = EXPERIENCES;

  return (
    <div className="flex flex-col text-left gap-4 w-full p-4 md:p-6 text-ink">
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