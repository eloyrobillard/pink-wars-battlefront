import { Maybe, Some, None } from '../types/index';
import { Squadron } from './squadron';

let pool: Squadron[];

/**
 * Variant of map that acts as an endofunctor (takes a ship, returns a ship and only a ship).
 * @param {(Ship, number) => Ship} cb the usual map callback
 * @returns {Ship[]}
 */
function map(cb: (squad: Squadron, index: number) => Squadron): Squadron[] {
  for (let i = 0; i < pool.length; i += 1) {
    pool[i] = cb(pool[i], i);
  }
  return [...pool];
}

function reduce<T>(cb: (acc: T, squad: Squadron, index: number) => T, first: T): T {
  let acc = first;
  for (let i = first ? 0 : 1; i < pool.length; i += 1) {
    acc = cb(acc, pool[i], i);
  }
  return acc;
}

function get(index: number) {
  return pool[index];
}

function set(ships: Squadron[]) {
  return pool = ships;
}

function remove(index: number) {
  delete pool[index];
}

function replace(index: number) {
  pool[index] = new Squadron(index, 255 / index);
}

function findSquadron(cb: (squadron: Squadron) => boolean): Maybe<Squadron> {
	for (let i = 0; i < pool.length; i += 1) {
		const current = Pool.get(i);
		if (cb(current)) {
			return new Some(current);
		}
	}
	return new None();
}

/**
 * Returns rand from pool, excluding own squadron.
 */
function getRand(except: number): Squadron {
  const rand = Math.floor(Math.random() * pool.length);
  if (rand !== except) {
    return pool[rand];
  }
  return pool[except + 1];
}

const Pool = { map, reduce, get, set, remove, findSquadron, getRand, replace };

export default Pool;