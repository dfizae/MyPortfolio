import './styles/App.css'
import Title from './pages/main/Title'
import ScrollFixedComponents from './pages/main/ScrollFixedComponents'
import Profile from './pages/main/Profile';
import Skills from './pages/main/Skills';

function App() {

  return (
    <>
      <ScrollFixedComponents/>
      <Title />
      <Profile />
      <Skills />
    </>
  );
}

export default App
