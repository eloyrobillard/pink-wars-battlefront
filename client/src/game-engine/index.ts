import Behavior from './ship/behavior/index';
import Pool from './ship/pool';
import { Ship } from './ship/ship';
import math from '../math/index'

const FPS = 30; // NOTE p5.draw ~= 76 fps
const fixedDeltaTime = 1 / FPS;
const fixedDeltaMsec = 1000 / FPS;
let frameStart = 0;

/**
 * Called once right after the Pool is loaded.
 */
function ready() {
  Pool.set([new Ship(math.randPos(), math.randRot(), true), ...Array.from({ length: 50 }, () => new Ship(math.randPos(), math.randRot()))]);
  const squadLeader = Pool.get(0);
  Pool.map((ship, i) => {
    // ship.ready();
    if (i > 0) {
      Behavior.setAnchor(ship, squadLeader);
    }
    return ship;
  });
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

// perform routine ship update
function update() {
  Pool.map((ship) => {
    Behavior.detectWalls(ship);
    ship.update();
    return ship;
  });
}

const Game = { FPS, fixedDeltaTime, start, frameIsReady, Pool, update, ready };

export default Game;
