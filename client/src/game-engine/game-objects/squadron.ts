import { Maybe, Some, None } from '../types/index';
import { FightMaker } from '../components/index';
import Behavior from './behavior/index';
import math from '../../math/index';
import { Ship } from './ship';
import Game from '../gameLoop';

export class Squadron {
	fightMaker: FightMaker = new FightMaker();
	inCombat = false;
	team: Maybe<Ship>[];
	leader!: Ship;
	id: number;
	color: number;

	constructor (id: number, color: number) {
		this.id = id;
		this.color = color;
		this.team = Array.from({ length: 6 }, (_, i) => {
			const member = new Some(new Ship(math.randPos(), math.randRot(), i));
			return member;
		});
		this.welcomeLeader(0);
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

	private findHighestRankingOfficer() {
		return this.team.findIndex((ship) => ship.isSome);
	}

	onCasualty(rank: number) {
		this.team[rank] = new None();
		if (rank > 0) return;

		const highestRankingOfficer = this.findHighestRankingOfficer();
		if (highestRankingOfficer > -1) {
			this.welcomeLeader(highestRankingOfficer);
		} else {
			// NOTE squadron decimated
			this.onDestroy();
		}
	}

	welcomeLeader(rank: number) {
		this.leader = this.team[rank].unwrap()!;
		this.leader.rank = 0;
		this.leader.anchor = new None();
		this.team.slice(rank + 1).map((member) => member.map((self) => {
			Behavior.setAnchor(self, this.leader);
			return self;
		}));
	}

	onDestroy() {
		Game.removeSquadron(this.id);
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

	update () {
		this.fightMaker.update(this.leader);

		this.team.map((ship) => {
			ship.map((self) => {
				Behavior.detectWalls(self);
				self.update();
				return self;
			});
			return ship;
		});
	}
}
