import { Anchor } from '../../components/index';
import math from '../../../math/index';
import Game from '../../index';
import { Ship } from '../ship';
import Pool from '../pool';

export function getAnchor(follower: Ship) {
  return new Anchor(closest(follower));
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

export function flock(ship: Ship) {
  const dest = ship.anchor!.anchor.transform.position;
  const rotToDest = ship.transform.position.vecTo(dest).toRotation();
  const deltaRot = math.lerp(ship.transform.rot, rotToDest, Game.fixedDeltaTime);

  return ship.addRot(deltaRot);
}