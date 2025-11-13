import './styles/App.css'
import Title from './pages/main/Title'
import ScrollFixedComponents from './pages/main/ScrollFixedComponents'
import Profile from './pages/main/Profile';
import Skills from './pages/main/Skills';
import Projects from './pages/main/Projects';
import Contact from './pages/main/Contact';

function App() {

  return (
    <>
      <ScrollFixedComponents/>
      <Title />
      <Profile />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}

export default App
