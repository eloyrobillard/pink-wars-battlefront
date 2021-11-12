import { Anchor } from '../types/index';
import { Ship } from '../ship';
import Pool from '../state/pool';

export function getAnchor(follower: Ship) {
  follower.anchor = new Anchor(closest(origin));
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