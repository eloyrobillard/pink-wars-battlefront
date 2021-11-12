import { Some } from '../../types/index';
import { Anchor } from '../../components/index';
import math from '../../../math/index';
import Game from '../../index';
import { Ship } from '../ship';
import Pool from '../pool';

export function getAnchor(follower: Ship) {
  const anchor = closestFree(follower);
  // console.log(anchor);
  anchor.setFollower(follower);
  return new Anchor(anchor);
}

/**
 * Manually sets anchor and follower for each argument.
 * @param follower 
 * @param anchor 
 * @returns Some(anchor)
 */
export function setAnchor(follower: Ship, anchor: Ship) {
  anchor.setFollower(follower);
  return follower.anchor = new Some(new  Anchor(anchor));
}

function closestFree(origin: Ship): Ship {
  const { position } = origin.transform;
  let index = Infinity;
  Pool.reduce<number>((acc, ship, i) => {
    const dist = position.distance(ship.transform.position)
    
    if (dist > 0 && dist < acc && ship.follower.isNone) {
      if (ship.anchor.isSome && ship.anchor.unwrap()!.anchor === origin) {
        return acc;
      }
      index = i;
      return dist;
    }
    return acc;
  }, Infinity);

  const anchor = Pool.get(index);
  console.log(anchor.follower.isNone, anchor.anchor.isNone ? 'no anchor' : anchor.anchor.unwrap()!.anchor === origin ? 'self anchor' : 'whatever');
  return anchor;
}

export function flock({ transform }: Ship, anchor: Ship) {
  const dest = anchor.transform.position;
  const vecTo = transform.position.vecTo(dest);
  const rotToDest = vecTo.toRotation();
  const deltaRot = getRotLerp(transform.rot, rotToDest) - transform.rot;
  // console.log(transform.rot, rotToDest, deltaRot);
  return transform.addRot(deltaRot);
}

function getRotLerp(start: number, end: number) {
  const absDiff = Math.abs(end - start);
  // more than π means faster to turn right
  if (absDiff > 180) {
    // actual diff considering angles are periodic
    const realDiff = 360 - absDiff;
    return math.lerp(start,  start - realDiff, Game.fixedDeltaTime);
  }
  return math.lerp(start, end, Game.fixedDeltaTime);
}