import Behavior from './behavior/index';
import math from '../../math/index';
import { Ship } from './ship';

export class Squadron {
	team: Ship[];
	id: number;
	color: number;

	constructor (id: number, color: number) {
		this.id = id;
		this.color = color;
		this.team = Array.from({ length: 6 }, (_, i) => {
			const member = new Ship(math.randPos(), math.randRot(), i);
			return member;
		});
		this.team.slice(1).forEach((member) => Behavior.setAnchor(member, this.team[0]));
	}

	start () {
		this.team.map((ship) => {
			ship.start();
			return ship;
		});
	}

	update () {
		this.team.map((ship) => {
			Behavior.detectWalls(ship);
			ship.update();
			return ship;
		});
	}

	/**
   * @param cb 
   * @returns a shallow copy of the team
   */
	map (cb: (ship: Ship, index: number) => Ship) {
		for (let i = 0; i < 6; i += 1) {
			this.team[i] = cb(this.team[i], i);
		}
		return [
			...this.team
		];
	}
}
