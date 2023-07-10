import './App.css';
import { useEffect, useState } from 'react'
import { fetchBoards } from './redux/boards/boardsSlice';
import { useAppDispatch } from './hooks/reduxHooks';
import Mobile from './components/Screens/Mobile';
import Desktop from './components/Screens/Desktop';
import AllModals from './components/modals/Modal';

function App() {
  const dispatch = useAppDispatch()
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);


  useEffect(() => {
    dispatch(fetchBoards())
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='app' style={{fontFamily:"'Plus Jakarta Sans', sans-serif"}}>
      {screenWidth > 768 ?
        <Desktop /> :
        <Mobile />
      }
      <AllModals screenWidth={screenWidth}/>
    </div>
  );
}

export default App;
