import { Anchor } from '../../components/index';
import math from '../../../math/index';
import Game from '../../index';
import { Ship } from '../ship';
import Pool from '../pool';

export function getAnchor(follower: Ship) {
  const anchor = closest(follower);
  // console.log(anchor);
  return new Anchor(anchor);
}

function closest(origin: Ship): Ship {
  const { position } = origin.transform;
  let index = Infinity;
  Pool.reduce<number>((acc, ship, i) => {
    const dist = position.distance(ship.transform.position)
    
    if (dist > 0 && dist < acc) {
      index = i;
      return dist;
    }
    return acc;
  }, Infinity);

  return Pool.get(index);
}

export function flock({ transform, anchor }: Ship) {
  const dest = anchor!.anchor.transform.position;
  const vecTo = transform.position.vecTo(dest);
  const rotToDest = vecTo.toRotation();
  const deltaRot = math.lerp(transform.rot, rotToDest, Game.fixedDeltaTime);
  // console.log(transform.rot, rotToDest, deltaRot);
  return transform.addRot(deltaRot);
}