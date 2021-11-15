import { Maybe, Some, None } from '../types/index';
import { Battalion } from './battalion';
import { Squadron } from './squadron';

const pool: Battalion[] = [
  new Battalion(0, 255, 'rebels'),
  new Battalion(1, 120),
  new Battalion(2, 0)
];

/**
 * Variant of map that acts as an endofunctor (takes a ship, returns a ship and only a ship).
 * @param {(Ship, number) => Ship} cb the usual map callback
 * @returns {Ship[]}
 */
function map(cb: (battalion: Battalion, index: number) => Battalion): Battalion[] {
  for (let i = 0; i < pool.length; i += 1) {
    pool[i] = cb(pool[i], i);
  }
  return [...pool];
}

function reduce<T>(cb: (acc: T, battalion: Battalion, index: number) => T, first: T): T {
  let acc = first;
  for (let i = first ? 0 : 1; i < pool.length; i += 1) {
    acc = cb(acc, pool[i], i);
  }
  return acc;
}

function get(index: number) {
  return pool[index];
}

// function set(ships: Battalion[]) {
//   return pool = ships;
// }

// function remove(index: number) {
//   delete pool[index];
// }

function replace(battalion: number, squadron: number) {
  pool[battalion].squadrons[squadron] = new Some(new Squadron(battalion, squadron, undefined, pool[battalion].getShipModel()));
}

function findSquadron(cb: (squadron: Maybe<Squadron>) => boolean): Maybe<Squadron> {
	for (let i = 0; i < pool.length; i += 1) {
		const current = Pool.get(i);
		for (let j = 0; j < current.squadrons.length; j += 1) {
      if (cb(current.squadrons[j])) {
        return current.squadrons[j];
      }
    }
	}
	return new None();
}

/**
 * Returns rand from pool, excluding own squadron.
 */
function getRand(except: number): Maybe<Squadron> {
  const rand = Math.floor(Math.random() * pool.length);
  if (rand !== except) {
    const randSquad = Math.floor(Math.random() * pool[rand].squadrons.length);
    return pool[rand].squadrons[randSquad];
  }
  const adjustedRand = (except + 1) % pool.length;
  const randSquad = Math.floor(Math.random() * pool[adjustedRand].squadrons.length);
  return pool[adjustedRand].squadrons[randSquad];
}

function enrollSquadron(battalionId: number) {
  pool[battalionId].enrollSquadron();
}

// const push = () => pool.push(new Battalion(pool.length, 255 / pool.length));

const Pool = { map, reduce, get, findSquadron, getRand, replace, enrollSquadron };

export default Pool;