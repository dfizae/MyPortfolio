import Title from './pages/main/Title'
import ScrollFixedComponents from './pages/main/ScrollFixedComponents'
import Profile from './pages/main/Profile';
import Skills from './pages/main/Skills';
import Projects from './pages/main/Projects';
import Contact from './pages/main/Contact';
import Posts from './pages/main/Posts';
import type { PostSummary } from './constants/Posts';

import ScrollFadeIn from './components/common/ScrollFadeIn';
import useSmoothScroll from './hooks/useSmoothScroll';


type AppProps = { pinnedPosts: PostSummary[]; recentPosts: PostSummary[] };

// 홈 한 페이지: Title, Profile, Posts, Skills, Projects, Contact 순서로 섹션을 쌓는다. 섹션 id는 위쪽 메뉴의 앵커다.
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

      {/* 대표 글, 최근 글은 소개(Profile) 바로 아래. 글이 없으면 그리지 않는다 (DESIGN.md §9 2026-11-23) */}
      <div id="posts">
        <Posts pinned={pinnedPosts} recent={recentPosts} />
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

      <div id="contact">
        <ScrollFadeIn direction='down'>
            <Contact />
        </ScrollFadeIn>
      </div>
    </>
  );
}

export default App