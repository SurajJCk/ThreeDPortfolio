import { useEffect } from 'react';
import './App.css';
import GameWorld from './components/World/GameWorld';
import LoadingScreen from './components/UI/LoadingScreen';
import GameUI from './components/UI/GameUI';
import ContentModal from './components/UI/ContentModal';
import useGameStore from './store/gameStore';

function App() {
  const { gameStarted, setLoading } = useGameStore();

  useEffect(() => {
    // Initialize loading
    setLoading(true, 0);
  }, [setLoading]);

  return (
    <div className="App relative w-full h-screen overflow-hidden">
      {/* Loading Screen */}
      <LoadingScreen />
      
      {/* Main 3D World */}
      {gameStarted && (
        <>
          <GameWorld />
          <GameUI />
          <ContentModal />
        </>
      )}
    </div>
  );
}

export default App;