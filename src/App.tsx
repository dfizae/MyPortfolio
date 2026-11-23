import Title from './pages/main/Title'
import ScrollFixedComponents from './pages/main/ScrollFixedComponents'
import Profile from './pages/main/Profile';
import Skills from './pages/main/Skills';
import Projects from './pages/main/Projects';
import Contact from './pages/main/Contact';

//Framer Motion
import ScrollFadeIn from './components/common/ScrollFadeIn';

//Lenis 훅
import useSmoothScroll from './hooks/useSmoothScroll';


function App() {
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

      <div id="contact">
        <ScrollFadeIn direction='down'>
            <Contact />
        </ScrollFadeIn>
      </div>
    </>
  );
}

export default App