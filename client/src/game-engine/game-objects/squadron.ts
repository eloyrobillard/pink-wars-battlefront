import { Maybe, Some, None } from '../types/index';
import Behavior from './behavior/index';
import math from '../../math/index';
import { Ship } from './ship';

export class Squadron {
	team: Maybe<Ship>[];
	id: number;
	color: number;

	constructor (id: number, color: number) {
		this.id = id;
		this.color = color;
		this.team = Array.from({ length: 6 }, (_, i) => {
			const member = new Some(new Ship(math.randPos(), math.randRot(), i));
			return member;
		});
		this.team.slice(1).map((member) => member.map((self) => {
			Behavior.setAnchor(self, this.team[0].unwrap()!)
			return self;
		}));
	}

	start () {
		this.team.map((ship) => {
			ship.map((self) => {
				self.start();
				return self;
			});
			return ship;
		});
	}

	update () {
		this.team.map((ship) => {
			ship.map((self) => {
				Behavior.detectWalls(self);
				self.update();
				return self;
			});
			return ship;
		});
	}

	onCasualty(rank: number) {
		if (rank) {
			this.team[rank] = new None();
		} else {
			
		}
	}

	/**
   * @param cb 
   * @returns a shallow copy of the team
   */
	map (cb: (ship: Ship, index: number) => Ship) {
		for (let i = 0; i < 6; i += 1) {
			this.team[i].map((self) => cb(self, i));
		}
		return [
			...this.team
		];
	}
}
