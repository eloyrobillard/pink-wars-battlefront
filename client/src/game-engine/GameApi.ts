/**
 * Sets a callback on a timer (in FPS).
 */
function setTimer(count: number, action: () => void) {
  let counter = 0;

  return () => {
    if ((counter + 1) < count) {
      return counter += 1;
    }
    action();
    return counter = 0;
  };
}

const GameApi = { 
  setTimer,
}

export default GameApi;