import { lazy, Suspense } from 'react';
import type { LottieComponentProps } from 'lottie-react';
import { useInView } from 'react-intersection-observer';

// 무거운 lottie 플레이어(약 317kB)를 별도 청크로 분리해 초기 번들에서 제외한다.
const Lottie = lazy(() => import('lottie-react'));

type LottieIconProps = {
  animationData: LottieComponentProps['animationData'];
  className?: string;
};

const LottieIcon = ({ animationData, className }: LottieIconProps) => {
  // 섹션이 뷰포트 근처(200px 이내)에 올 때 한 번만 lottie 청크를 불러온다.
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '200px',
  });

  // 래퍼 div가 항상 아이콘 크기를 차지해 로딩 전후 레이아웃 시프트를 방지한다.
  return (
    <div ref={ref} className={className}>
      {inView && (
        <Suspense fallback={null}>
          <Lottie animationData={animationData} loop className="w-full h-full" />
        </Suspense>
      )}
    </div>
  );
};

export default LottieIcon;
