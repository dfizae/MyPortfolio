import './styles/App.css'
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
        <div id="home">
            <Title />
        </div>
      </ScrollFadeIn>
       
      <div id="profile">
        <Profile />
      </div>
 
      <div id="skill">
        <ScrollFadeIn direction='left'>
            <Skills />
        </ScrollFadeIn>
      </div>

      <div id="project">
        <ScrollFadeIn direction='down' distance={100}>
            <Projects />
        </ScrollFadeIn>
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