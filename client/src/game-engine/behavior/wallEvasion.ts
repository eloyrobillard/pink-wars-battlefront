import math from '../../math/index';
import { Ship } from '../types/index';

const WALL_DIST = 100; // px

export function evadeRight(ship: Ship, rot: number) {
  // if going straight towards wall
  if (rot === 0) {
    return ship.wallEvadeRot = math.randDir() > 0 ? 1 : -1;
  } else if (rot > 315) {
    // evade to right
    return ship.wallEvadeRot = -1;
  } 
  // evade to left
  return ship.wallEvadeRot = 1;
}


// normal is angle perpendicular to wall
function evade(ship: Ship, rot: number, normal: number) {
  // if going straight towards wall
  if (rot === normal) {
    return ship.wallEvadeRot = math.randDir() > 0 ? 1 : -1;
  } else if (rot < normal) {
    // evade to right
    return ship.wallEvadeRot = -1;
  } 
  // evade to left
  return ship.wallEvadeRot = 1;
}

function detectedFront(ship: Ship, rot: number): boolean {
  
}

export function detectWalls(ship: Ship) {
  let deltaRot = 0;

  const rot = Math.floor(ship.transform.rot);
  if (!detectedFront(ship, rot))
  
  // if ship moving mostly horizontally
  // if (rot < 45 || rot > 315 || (rot > 135 && rot < 225)) {
  //   if (y - width < WALL_DIST) {
  //     // top
  //     deltaRot = evade(ship, rot, 90);
  //   } else if (y + width > window.innerHeight - WALL_DIST) {
  //     // bottom
  //     deltaRot = evade(ship, rot, 270);
  //   } else if (x - height < WALL_DIST) {
  //     // left
  //     deltaRot = evade(ship, rot, 180);
  //   } else if (x + height > window.innerWidth - WALL_DIST) {
  //     // right
  //     deltaRot = evadeRight(ship, rot);
  //   }
  // }
  
  // if ship moving mostly vertically, check for height
  // if ((rot < 315 && rot > 225) || (rot > 45 && rot < 135)) {
  //   if (y - width < WALL_DIST) {
  //     // top
  //     deltaRot = evadeTop(ship, rot);
  //   } else if (y + width > window.innerHeight - WALL_DIST) {
  //     // bottom
  //     deltaRot = evade(ship, rot, 180);
  //   } else if (x - height < WALL_DIST) {
  //     // left
  //     deltaRot = evade(ship, rot, 90);
  //   } else if (x + height > window.innerWidth - WALL_DIST) {
  //     // right
  //     console.log(rot);
  //     deltaRot = evade(ship, rot, 270);
  //   }
  // }

  // no wall to avoid
  return ship.addRot(deltaRot);
}
