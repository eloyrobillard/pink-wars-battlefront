import { Ship } from '../types/index';
import math from '../../math/index';

const pool: Ship[] = Array.from({ length: 50 }, () => new Ship(math.randPos(), math.randRot()));

/**
 * Variant of map that acts as an endofunctor (takes a ship, returns a ship and only a ship).
 * @param {(Ship, number) => Ship} cb the usual map callback
 * @returns {Ship[]}
 */
function map(cb: (ship: Ship, index: number) => Ship): Ship[] {
  for (let i = 0; i < pool.length; i += 1) {
    pool[i] = cb(pool[i], i);
  }
  return [...pool];
}

function reduce<T>(cb: (acc: T, ship: Ship, index: number) => T, first: T): T {
  let acc = first;
  for (let i = first ? 0 : 1; i < pool.length; i += 1) {
    acc = cb(acc, pool[i], i);
  }
  return acc;
}

function get(index: number) {
  return pool[index];
}

const Pool = { map, reduce, get };

export default Pool;