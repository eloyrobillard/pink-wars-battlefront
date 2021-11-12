import { Ship } from '../types/index';
import math from '../../math/index';

const pool: Ship[] = Array.from({ length: 50}, () => new Ship(math.randPos(), math.randRot()));

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

const Pool = { map };

export default Pool;