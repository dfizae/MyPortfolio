import Title from './pages/main/Title'
import ScrollFixedComponents from './pages/main/ScrollFixedComponents'
import Profile from './pages/main/Profile';
import Skills from './pages/main/Skills';
import Projects from './pages/main/Projects';
import Contact from './pages/main/Contact';
import Posts from './pages/main/Posts';
import type { PostSummary } from './constants/Posts';

//Framer Motion
import ScrollFadeIn from './components/common/ScrollFadeIn';

//Lenis 훅
import useSmoothScroll from './hooks/useSmoothScroll';


type AppProps = { pinnedPosts: PostSummary[]; recentPosts: PostSummary[] };

function App({ pinnedPosts, recentPosts }: AppProps) {
  useSmoothScroll();

  return (
    <>
      <ScrollFixedComponents/>
       
      <ScrollFadeIn>
            <Title />
      </ScrollFadeIn>
       
      <div id="profile">
        <Profile />
      </div>
 
      <div id="skill">
        <ScrollFadeIn direction='left'>
            <Skills />
        </ScrollFadeIn>
      </div>

      {/* Projects는 모바일에서 뷰포트의 5배 이상 길어 섹션 래퍼 대신 카드 단위로 등장 (DESIGN.md §9 2026-08-21) */}
      <div id="project">
        <Projects />
      </div>

      {/* 대표 글, 최근 글. 글이 없으면 그리지 않는다 */}
      <div id="posts">
        <Posts pinned={pinnedPosts} recent={recentPosts} />
      </div>

      <div id="contact">
        <ScrollFadeIn direction='down'>
            <Contact />
        </ScrollFadeIn>
      </div>
    </>
  );
}

export default App