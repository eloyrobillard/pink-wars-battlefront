import Behavior from './ship/behavior/index';
import Pool from './ship/pool';
import { Squad } from './ship/squad';

const FPS = 30; // NOTE p5.draw ~= 76 fps
const fixedDeltaTime = 1 / FPS;
const fixedDeltaMsec = 1000 / FPS;
let frameStart = 0;

/**
 * Called once right after the Pool is loaded.
 */
function ready() {
  Pool.set(Array.from({ length: 6 }, (_, i) => new Squad(i, 255 / (i + 1))));
  // Pool.set([new Ship(math.randPos(), math.randRot(), true), ...Array.from({ length: 500 }, () => new Ship(math.randPos(), math.randRot()))]);
  // const squadLeader = Pool.get(0);
  // Pool.map((squad, i) => {
  //   // squad.ready();
  //   // if (i > 0) {
  //   //   Behavior.setAnchor(squad, squadLeader);
  //   // }

  //   if (Pool.get(i + 1)) {
  //     Behavior.setAnchor(Pool.get(i + 1), squad);
  //   }
  //   return squad;
  // });
}

function start () {
  frameStart = performance.now();
  ready();
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

const Game = { FPS, fixedDeltaTime, start, frameIsReady, Pool, update, ready };

export default Game;
