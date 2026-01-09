import React, { useEffect, useState } from 'react';
import useGameStore from '../../store/gameStore';

const LoadingScreen = () => {
  const { isLoading, loadingProgress, startGame } = useGameStore();
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simulate loading progress
    if (isLoading && loadingProgress < 100) {
      const timer = setTimeout(() => {
        useGameStore.setState({ loadingProgress: loadingProgress + 10 });
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isLoading, loadingProgress]);

  if (!isLoading && loadingProgress === 100) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="text-center space-y-8 px-4">
        {/* Logo/Title */}
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-white tracking-tight">
            Suraj J Changkakoti
          </h1>
          <p className="text-xl text-slate-300">
            Creative Technologist & Builder
          </p>
        </div>

        {/* Loading Progress */}
        <div className="space-y-4 max-w-md mx-auto">
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="text-slate-400 text-sm">
            Loading experience{dots} {loadingProgress}%
          </p>
        </div>

        {/* Start Button (appears when loaded) */}
        {loadingProgress === 100 && (
          <button
            onClick={startGame}
            className="px-8 py-4 bg-white text-slate-900 font-semibold rounded-lg 
                     hover:bg-slate-100 transition-all duration-300 transform hover:scale-105
                     shadow-lg hover:shadow-xl"
          >
            Enter World
          </button>
        )}

        {/* Hint */}
        {loadingProgress < 100 && (
          <div className="text-slate-500 text-xs space-y-1">
            <p>🎮 Use WASD or Arrow Keys to move</p>
            <p>🖱️ Move mouse to look around</p>
            <p>E to interact with objects</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;