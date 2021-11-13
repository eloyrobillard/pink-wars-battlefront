import { Some, vec2 } from '../../types/index';
import { Anchor } from '../../components/index';
import DebugApi from '../../../DebugApi'
// import math from '../../../math/index';
// import Game from '../../index';
import { Ship } from '../ship';
// import Pool from '../pool';

/**
 * Manually sets anchor and follower for each argument.
 * @param follower 
 * @param anchor 
 * @returns Some(anchor)
 */
export function setAnchor(follower: Ship, anchor: Ship) {
  anchor.setFollower(follower);
  return follower.anchor = new Some(new Anchor(anchor));
}

export function flock({ transform }: Ship, anchor: Ship) {
  const { position, direction } = anchor.transform;
  const dest = new vec2( 
    position.x - direction.x * 30,
    position.y - direction.y * 30,
  );
  DebugApi.placeP5Call((p5) => {
    p5.point(dest.x, dest.y);
    p5.stroke('purple'); // Change the color
    p5.strokeWeight(10);
  });
  const vecTo = transform.position.vecTo(dest);
  const rotToDest = vecTo.toRotation();
  return transform.lerpRot(rotToDest);
}

//! NOTE keep for randomized anchoring
// export function getAnchor(follower: Ship) {
//   const anchor = closestFree(follower);
//   // console.log(anchor);
//   anchor.setFollower(follower);
//   return new Anchor(anchor);
// }

//! NOTE keep for randomized anchoring
// function closestFree(origin: Ship): Ship {
//   const { position } = origin.transform;
//   let index = Infinity;
//   Pool.reduce<number>((acc, ship, i) => {
//     const dist = position.distance(ship.transform.position)
    
//     if (dist > 0 && dist < acc && ship.follower.isNone) {
//       if (ship.anchor.isSome && ship.anchor.unwrap()!.anchor === origin) {
//         return acc;
//       }
//       index = i;
//       return dist;
//     }
//     return acc;
//   }, Infinity);

//   const anchor = Pool.get(index);
//   return anchor;
// }

//! NOTE keep for randomized anchoring
// function getRotLerp(start: number, end: number) {
//   const absDiff = Math.abs(end - start);
//   // more than π means faster to turn right
//   if (absDiff > 180) {
//     // actual diff considering angles are periodic
//     const realDiff = 360 - absDiff;
//     return math.lerp(start,  start - realDiff, Game.fixedDeltaTime);
//   }
//   return math.lerp(start, end, Game.fixedDeltaTime);
// }