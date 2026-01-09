import { create } from 'zustand';

// Game state management using Zustand
const useGameStore = create((set, get) => ({
  // Player state
  playerPosition: [0, 1, 5],
  playerRotation: [0, 0, 0],
  playerVelocity: [0, 0, 0],
  
  // Game state
  currentZone: 'welcome',
  isLoading: true,
  loadingProgress: 0,
  gameStarted: false,
  
  // Interaction state
  nearbyInteractable: null,
  showPrompt: false,
  promptMessage: '',
  activeContent: null,
  
  // UI state
  showInstructions: true,
  showMenu: false,
  cameraMode: 'follow', // 'follow', 'free', 'locked'
  
  // Audio state
  audioEnabled: true,
  musicVolume: 0.5,
  sfxVolume: 0.7,
  
  // Performance
  fps: 60,
  qualityMode: 'high', // 'high', 'medium', 'low'
  
  // Easter eggs
  discoveredSecrets: [],
  
  // Actions
  setPlayerPosition: (position) => set({ playerPosition: position }),
  
  setPlayerRotation: (rotation) => set({ playerRotation: rotation }),
  
  setPlayerVelocity: (velocity) => set({ playerVelocity: velocity }),
  
  setCurrentZone: (zone) => set({ currentZone: zone }),
  
  setLoading: (isLoading, progress = 0) => set({ 
    isLoading, 
    loadingProgress: progress 
  }),
  
  startGame: () => set({ 
    gameStarted: true, 
    isLoading: false,
    showInstructions: true 
  }),
  
  setNearbyInteractable: (interactable) => set({ 
    nearbyInteractable: interactable,
    showPrompt: !!interactable,
    promptMessage: interactable ? interactable.promptText : ''
  }),
  
  interact: () => {
    const { nearbyInteractable } = get();
    if (nearbyInteractable) {
      set({ activeContent: nearbyInteractable });
      if (nearbyInteractable.onInteract) {
        nearbyInteractable.onInteract();
      }
    }
  },
  
  closeContent: () => set({ activeContent: null }),
  
  toggleInstructions: () => set((state) => ({ 
    showInstructions: !state.showInstructions 
  })),
  
  toggleMenu: () => set((state) => ({ showMenu: !state.showMenu })),
  
  toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),
  
  setVolume: (type, volume) => set({ 
    [type === 'music' ? 'musicVolume' : 'sfxVolume']: volume 
  }),
  
  setQualityMode: (mode) => set({ qualityMode: mode }),
  
  discoverSecret: (secretId) => set((state) => ({
    discoveredSecrets: [...state.discoveredSecrets, secretId]
  })),
  
  updateFPS: (fps) => set({ fps }),
  
  reset: () => set({
    playerPosition: [0, 1, 5],
    playerRotation: [0, 0, 0],
    currentZone: 'welcome',
    activeContent: null,
    nearbyInteractable: null,
    showPrompt: false,
    discoveredSecrets: []
  })
}));

export default useGameStore;