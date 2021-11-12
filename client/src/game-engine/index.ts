import Behavior from './ship/behavior/index';
import Pool from './ship/pool';
import { Ship } from './ship/ship';
import math from '../math/index'
import { isJsxClosingFragment } from 'typescript';

const FPS = 30; // NOTE p5.draw ~= 76 fps
const fixedDeltaTime = 1 / FPS;
const fixedDeltaMsec = 1000 / FPS;
let frameStart = 0;

/**
 * Called once right after the Pool is loaded.
 */
function ready() {
  Pool.set([new Ship(math.randPos(), math.randRot(), true), ...Array.from({ length: 50 }, () => new Ship(math.randPos(), math.randRot()))]);
  Pool.map((ship, i) => {
    // ship.ready();
    if (Pool.get(i + 1)) {
      const follower = Pool.get(i + 1);
      Behavior.setAnchor(follower, ship);
      console.log(follower);
    }
    return ship;
  });
  Pool.map((ship) => {
    if (ship.anchor.isNone) console.log('no anchor');
    return ship;
  })
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
