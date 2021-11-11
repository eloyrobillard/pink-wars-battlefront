import pool from './state/pool';

// NOTE p5.draw update ~= 76 fps
const FPS = 30;
const fixedDeltaTime = 1 / FPS;
const fixedDeltaMsec = 1000 / FPS;
let frameStart = 0;

function start () {
  frameStart = performance.now();
}

function frameIsReady() {
  const now = performance.now();
  const delta = now - frameStart;
  if (delta >= fixedDeltaMsec) {
    frameStart = performance.now();
    return true;
  }
  return false;
}

const Game = { FPS, fixedDeltaTime, start, frameIsReady, pool };

export default Game;