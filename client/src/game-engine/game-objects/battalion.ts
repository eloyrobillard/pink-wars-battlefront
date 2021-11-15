import { Maybe, Some, None } from '../types/index';
import { Squadron } from './squadron';
import allegiances from './ship-model/allegiances';
import GameApi from '../GameApi';
import { Ship } from './ship';

export class Battalion {
	squadrons: Maybe<Squadron>[];
	battalionId: number;
	color: number;
  shipModels: string[];

	constructor (
		id: number,
		color: number,
		public allegiance: string = 'triangles'
	) {
		this.battalionId = id;
		this.color = color;
    this.shipModels = allegiances[allegiance];
		this.squadrons = this.getSquadrons();
	}

	private getSquadrons (): Maybe<Squadron>[] {
		const squadrons: Maybe<Squadron>[] = Array.from(
			{ length: 3 },
			() => new None()
		);
		const spots = GameApi.battleStartSpots();
		for (let i = 0; i < squadrons.length; i += 1) {
      const randModel = this.shipModels[Math.floor(Math.random() * this.shipModels.length)];
			squadrons[i] = new Some(
				new Squadron(this.battalionId, i, spots[i], randModel)
			);
		}
		return squadrons;
	}

	enrollSquadron () {
    const randModel = this.shipModels[Math.floor(Math.random() * this.shipModels.length)];
		this.squadrons.push(
			new Some(
				new Squadron(
					this.battalionId,
					this.squadrons.length,
					undefined,
					randModel
				)
			)
		);
	}

	mapShips (cb: (ship: Ship) => Ship) {
		this.squadrons.map((maybeSquadron) => {
			maybeSquadron.map((squadron) => {
				squadron.map(cb);
				return squadron;
			});
			return maybeSquadron;
		});
	}

	start () {
		this.squadrons.map((maybeSquadron) => {
			maybeSquadron.map((squadron) => {
				squadron.start();
				return squadron;
			});
			return maybeSquadron;
		});
	}

	update () {
		this.squadrons.map((maybeSquadron) => {
			maybeSquadron.map((squadron) => {
				squadron.update();
				return squadron;
			});
			return maybeSquadron;
		});
	}
}
