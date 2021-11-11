import math from '../../math/index';
import { Ship } from '../../types/index';

const WALL_DIST = 100; // px

export function evadeTop(ship: Ship, rot: number) {
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

export function detectWalls(ship: Ship) {
  let deltaRot = 0;
  const { height, width, base: { x, y }} = ship;
  const rot = Math.floor(ship.rot);
  
  // if ship moving mostly vertically, check for height
  if (rot > 315 || rot < 45 || (rot > 135 && rot < 225)) {
    if (y - height < WALL_DIST) {
      // top
      deltaRot = evadeTop(ship, rot);
    } else if (y + height > window.innerHeight - WALL_DIST) {
      deltaRot = evade(ship, rot, 180);
    }
  }
  
  // if ship moving mostly horizontally, check for width
  if ((rot < 315 && rot > 225) || (rot > 45 && rot < 135)) {
    if (x - width < WALL_DIST) {
      deltaRot = evade(ship, rot, 90);
    } else if (x + width > window.innerWidth - WALL_DIST) {
      deltaRot = evade(ship, rot, 270);
    }
  }

  // no wall to avoid
  return ship.addRot(deltaRot);
}
