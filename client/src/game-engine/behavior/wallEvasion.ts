import math from '../../math/index';
import { vec2, Maybe, Some, None, Ship } from '../types/index';

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

type CastHit = { 
  normal: vec2;
}

function castFront(front: vec2, direction: vec2, rot: number): Maybe<CastHit> {
  // angle to side of quadrant, if we split screen into four zones meeting at center
  const beta = rot % 90;
  const deltaX = 50 * math.cosConvert(beta);
  const deltaY = 50 * math.sinConvert(beta);

  const { x, y } = front;
  // direction x/y used for negative directions
  const castPoint = { 
    x: x + deltaX * direction.x,
    y: y + deltaY * direction.y
  }

  if (castPoint.x < 0) {
    // found left wall
    return new Some({
      normal: {
        x: 1,
        y: 0
      }
    })
  } else if (castPoint.x > window.innerWidth) {
    // found right wall
    return new Some({
      normal: {
        x: -1,
        y: 0
      }
    })
  } else if (castPoint.y < 0) {
    // found top wall
    return new Some({
      normal: {
        x: 0,
        y: 1
      }
    })
  } else if (castPoint.y > window.innerHeight) {
    // found top wall
    return new Some({
      normal: {
        x: 0,
        y: -1
      }
    })
  }

  return new None();
}

export function detectWalls(ship: Ship) {
  let deltaRot = 0;

  const { position, direction } = ship.transform;
  const rot = Math.floor(ship.transform.rot);
  
  const maybeWall = castFront(position, direction, rot);
  if (maybeWall.isNone) {
    ship.wallEvadeRot = 0;
    return;
  }
  
  const { normal } = maybeWall.unwrapOr();
  const angleToHit = 
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
