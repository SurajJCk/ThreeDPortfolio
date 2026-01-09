import React, { useEffect } from 'react';
import useGameStore from '../../store/gameStore';
import { Settings, Volume2, VolumeX, HelpCircle, X } from 'lucide-react';

const GameUI = () => {
  const {
    showPrompt,
    promptMessage,
    showInstructions,
    toggleInstructions,
    currentZone,
    audioEnabled,
    toggleAudio,
    interact,
    discoveredSecrets
  } = useGameStore();

  // Handle interaction key
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key.toLowerCase() === 'e') {
        interact();
      }
      if (e.key.toLowerCase() === 'h') {
        toggleInstructions();
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [interact, toggleInstructions]);

  return (
    <>
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 p-4 flex justify-between items-start pointer-events-none">
        {/* Zone Indicator */}
        <div className="bg-slate-900/80 backdrop-blur-sm px-4 py-2 rounded-lg pointer-events-auto">
          <p className="text-white text-sm font-semibold">
            📍 {currentZone === 'welcome' ? 'Welcome Plaza' : 
                currentZone === 'projects' ? "Builder's Workshop" : 
                'Connection Hub'}
          </p>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <button
            onClick={toggleInstructions}
            className="bg-slate-900/80 backdrop-blur-sm p-2 rounded-lg hover:bg-slate-800 
                     transition-colors pointer-events-auto"
            title="Toggle Instructions (H)"
          >
            <HelpCircle className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={toggleAudio}
            className="bg-slate-900/80 backdrop-blur-sm p-2 rounded-lg hover:bg-slate-800 
                     transition-colors pointer-events-auto"
            title="Toggle Audio"
          >
            {audioEnabled ? 
              <Volume2 className="w-5 h-5 text-white" /> : 
              <VolumeX className="w-5 h-5 text-white" />
            }
          </button>
        </div>
      </div>

      {/* Interaction Prompt */}
      {showPrompt && (
        <div className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-40 
                      bg-slate-900/90 backdrop-blur-sm px-6 py-3 rounded-full 
                      border-2 border-white/20 animate-bounce pointer-events-none">
          <p className="text-white font-semibold flex items-center gap-2">
            <span className="bg-white text-slate-900 px-2 py-1 rounded text-xs font-bold">E</span>
            {promptMessage}
          </p>
        </div>
      )}

      {/* Instructions Panel */}
      {showInstructions && (
        <div className="fixed bottom-4 left-4 z-40 bg-slate-900/90 backdrop-blur-sm 
                      p-6 rounded-lg max-w-sm pointer-events-auto">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-white font-bold text-lg">Controls</h3>
            <button onClick={toggleInstructions} className="text-white/60 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2 text-sm text-white/80">
            <p>🎮 <span className="font-semibold">WASD / Arrow Keys:</span> Move</p>
            <p>🖱️ <span className="font-semibold">Mouse:</span> Look around</p>
            <p>⚡ <span className="font-semibold">E:</span> Interact with objects</p>
            <p>❓ <span className="font-semibold">H:</span> Toggle help</p>
            <p className="text-xs text-white/60 mt-4">
              Explore the world and discover interactive elements!
            </p>
          </div>
        </div>
      )}

      {/* Secrets Counter */}
      {discoveredSecrets.length > 0 && (
        <div className="fixed bottom-4 right-4 z-40 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 
                      backdrop-blur-sm border border-yellow-500/30 px-4 py-2 rounded-lg pointer-events-none">
          <p className="text-yellow-200 text-sm font-semibold">
            ⭐ Secrets Found: {discoveredSecrets.length}/2
          </p>
        </div>
      )}

      {/* FPS Counter (optional - can be toggled in settings) */}
      <div className="fixed top-4 right-4 text-white/40 text-xs font-mono pointer-events-none">
        {/* FPS will be updated dynamically */}
      </div>
    </>
  );
};

export default GameUI;