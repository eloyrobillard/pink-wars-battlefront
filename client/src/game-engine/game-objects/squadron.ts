import Behavior from './behavior/index';
import math from '../../math/index';
import { Ship } from './ship';

export class Squadron {
	leader: Ship;
	members: Ship[];
	private squad: Ship[];
	id: number;
	color: number;

	constructor (id: number, color: number) {
		this.id = id;
		this.color = color;
		this.leader = new Ship(math.randPos(), math.randRot(), 0);
		this.members = Array.from({ length: 5 }, (_, i) => {
			const member = new Ship(math.randPos(), math.randRot(), i + 1);
			Behavior.setAnchor(member, this.leader);
			return member;
		});
		this.squad = [
			this.leader,
			...this.members
		];
	}

	// start () {
	// 	this.squad.map((ship) => {
	// 		ship.start();
	// 		return ship;
	// 	});
	// }

	update () {
		this.squad.map((ship) => {
			Behavior.detectWalls(ship);
			ship.update();
			return ship;
		});
	}

	/**
   * @param cb 
   * @returns a shallow copy of the squad
   */
	map (cb: (ship: Ship, index: number) => Ship) {
		for (let i = 0; i < 6; i += 1) {
			this.squad[i] = cb(this.squad[i], i);
		}
		return [
			...this.squad
		];
	}
}
