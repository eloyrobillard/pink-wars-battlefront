import Pool from './ship/pool';
import { Squad } from './ship/squad';

const FPS = 30; // NOTE p5.draw ~= 76 fps
const fixedDeltaTime = 1 / FPS;
const fixedDeltaMsec = 1000 / FPS;
let frameStart = 0;

function start () {
  frameStart = performance.now();

  Pool.set(Array.from({ length: 6 }, (_, i) => new Squad(i, 255 / (i + 1))));
  Pool.map((squad) => {
    squad.start();
    return squad;
  })
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

// perform routine squad update
function update() {
  Pool.map((squad) => {
    squad.update();
    return squad;
  });
}

const Game = { FPS, fixedDeltaTime, start, frameIsReady, Pool, update };

export default Game;
