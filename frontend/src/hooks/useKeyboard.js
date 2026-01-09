import { useEffect, useState } from 'react';

// Custom hook for keyboard input handling
export const useKeyboard = () => {
  const [keys, setKeys] = useState({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeys((prevKeys) => ({ ...prevKeys, [e.key.toLowerCase()]: true }));
    };

    const handleKeyUp = (e) => {
      setKeys((prevKeys) => ({ ...prevKeys, [e.key.toLowerCase()]: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keys;
};

// Helper function to check movement keys
export const getMovementInput = (keys) => {
  const forward = (keys['w'] || keys['arrowup']) ? 1 : 0;
  const backward = (keys['s'] || keys['arrowdown']) ? 1 : 0;
  const left = (keys['a'] || keys['arrowleft']) ? 1 : 0;
  const right = (keys['d'] || keys['arrowright']) ? 1 : 0;
  const jump = keys[' '] || keys['space'];
  const interact = keys['e'];

  return {
    forward: forward - backward,
    right: right - left,
    jump,
    interact
  };
};

export default useKeyboard;