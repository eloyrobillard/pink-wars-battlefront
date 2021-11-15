import { Maybe, Some, None, Vec2 } from '../types/index';
import { FightMaker } from '../components/index';
import ShipModels from './ship-model/index';
import { Battalion } from './battalion';
import Behavior from './behavior/index';
import math from '../../math/index';
import GameApi from '../GameApi';
// import Game from '../gameLoop';
import { Ship } from './ship';

export class Squadron {
	fightMaker: FightMaker;
	team: Maybe<Ship>[];
	leader: Ship;
	id: number;

	constructor (
		private battalion: Battalion,
		public battalionId: number,
		id: number,
		spot = GameApi.enterBattlefield(),
		private shipsModel: string = 'triangle'
	) {
		this.id = id;

		this.team = this.createTeam(spot);

		this.leader = this.welcomeLeader(0);
		this.fightMaker = new FightMaker(this.id, this.leader);
	}

	private createTeam ({ pos, rot }: { pos: Vec2; rot: number }) {
		const team: Maybe<Ship>[] = Array.from({ length: 6 }, () => new None());
		for (let i = 0; i < team.length; i += 1) {
			team[i] = new Some(
				new Ship(
					new Vec2(
						pos.x - 10 * math.cosConvert(rot) * i,
						pos.y - 10 * math.cosConvert(rot) * i
					),
					rot,
					this,
					this.battalionId,
					i,
					ShipModels[this.shipsModel]
				)
			);
		}
		return team;
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

	private findHighestRankingOfficer () {
		return this.team.findIndex((ship) => ship.isSome);
	}

	onCasualty (rank: number) {
		this.team[rank] = new None();
		if (rank > 0) return;

		const highestRankingOfficer = this.findHighestRankingOfficer();
		if (highestRankingOfficer > -1) {
			this.leader = this.welcomeLeader(highestRankingOfficer);
		} else {
			// NOTE squadron decimated
			this.onDestroy();
		}
	}

	welcomeLeader (rank: number) {
		const leader = this.team[rank].unwrap()!;
		leader.rank = 0;
		leader.anchor = new None();
		this.team.slice(rank + 1).map((member) =>
			member.map((self) => {
				Behavior.setAnchor(self, leader);
				return self;
			})
		);

		return leader;
	}

	onDestroy () {
		this.fightMaker.onDestroy();
		this.battalion.replaceSquadron(this.id);
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
