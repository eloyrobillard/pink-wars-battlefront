import { Ship } from '../types/index';
import math from '../../math/index';

const pool = Array.from({ length: 50}, () => new Ship(math.randPos(), math.randRot()));

function insert() {

}

function map(cb: (el: Ship, i: number) => Ship): Ship[] {
  for (let i = 0; i < pool.length; i += 1) {
    pool[i] = cb(pool[i], i);
  }
  return [...pool];
}

const Pool = { insert, map };

export default Pool;