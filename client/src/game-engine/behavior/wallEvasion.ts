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
  angle: number;
}

function cast(front: vec2, direction: vec2, rot: number): Maybe<CastHit> {
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
      },
      angle: 0
    })
  } else if (castPoint.x > window.innerWidth) {
    // found right wall
    return new Some({
      normal: {
        x: -1,
        y: 0
      },
      angle: 180
    })
  } else if (castPoint.y < 0) {
    // found top wall
    return new Some({
      normal: {
        x: 0,
        y: 1
      },
      angle: 270
    })
  } else if (castPoint.y > window.innerHeight) {
    // found bottom wall
    return new Some({
      normal: {
        x: 0,
        y: -1
      },
      angle: 90
    })
  }

  return new None();
}

export function detectWalls(ship: Ship) {
  let deltaRot = 0;

  const { position, direction } = ship.transform;
  const rot = Math.floor(ship.transform.rot);
  
  const maybeWall = cast(position, direction, rot);
  if (maybeWall.isNone) {
    ship.wallEvadeRot = 0;
    return;
  }
  
  const { angle } = maybeWall.unwrap()!;
  if (angle === 0 || angle === 180) {
    // left or right
    if ((rot % 180) > 90) {
      // wants to turn right, so check if not wall on right
      const maybeRight = rot < 180
        ? cast(position, { x: 0, y: -1}, 90)
        : cast(position, { x: 0, y: 1 }, 270);
      if (maybeRight.isSome) deltaRot = 100;
    } else {
      // wants to turn left, so check if not wall on left
      const maybeLeft = rot < 180
        ? cast(position, { x: 0, y: -1}, 90)
        : cast(position, { x: 0, y: 1 }, 270);
      if (maybeLeft.isSome) deltaRot = -100;
    }
  } else {
    // top or bottom
    if ((rot % 180) < 90) {
      // wants to turn right, so check if not wall on right
      const maybeRight = rot < 180
        ? cast(position, { x: 0, y: -1}, 90)
        : cast(position, { x: 0, y: 1 }, 270);
      if (maybeRight.isSome) deltaRot = 100;
    } else {
      // wants to turn left, so check if not wall on left
      const maybeLeft = rot < 180
        ? cast(position, { x: 0, y: -1}, 90)
        : cast(position, { x: 0, y: 1 }, 270);
      if (maybeLeft.isSome) deltaRot = -100;
    }
  }

  return ship.addRot(deltaRot);
}

