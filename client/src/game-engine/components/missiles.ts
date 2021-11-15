import { Maybe, Some, None, Vec2 } from '../types/index';
import { Missile } from '../game-objects/missile';
import { Transform2D } from './index';
import GameApi from '../GameApi';
import math from '../../math/index';

export class Missiles {
	curr = 0;
	missiles: Maybe<Missile>[] = Array.from({ length: 6 }, () => new None());

	constructor (
		public battalionId: number,
		public transform: Transform2D,
		private offsets: Vec2[],
	) {}

	private fireCounter = GameApi.setTimer(
		GameApi.secToFPS(1.6) - Math.floor(Math.random() * GameApi.secToFPS(1.3)),
		() => {
			const missile = new Missile(
				this,
				this.transform.position,
				this.transform.rot,
				this.battalionId,
				this.curr /* this.type */
			);
			this.insert(missile);
		}
	);

	private updateFireCounter () {
		this.fireCounter = GameApi.setTimer(
			GameApi.secToFPS(1.6) - Math.floor(Math.random() * GameApi.secToFPS(1.3)),
			() => {
				const { x, y } = this.transform.position;
				const { rot } = this.transform;
				for (let i = 0; i < this.offsets.length; i++) {
					const { x: dx, y: dy } = this.offsets[i];
					const missile = new Missile(
						this,
						new Vec2(
							x + dx * math.cosConvert(rot) + dy * math.sinConvert(rot),
							y - dx * math.sinConvert(rot) + dy * math.cosConvert(rot)
						),
						this.transform.rot,
						this.battalionId,
						this.curr /* this.type */
					);
					this.insert(missile);
				}
			}
		);
	}

	private insert (missile: Missile) {
		this.missiles[this.curr] = new Some(missile);
		if (this.curr + 1 < this.missiles.length) {
			this.curr += 1;
		} else {
			this.curr = 0;
		}
	}

	destroy (id: number) {
		this.missiles[id] = new None();
	}

	update () {
		if (this.fireCounter() === 0) {
			this.updateFireCounter();
		}

		this.missiles.map((missile) =>
			missile.map((self) => {
				self.update();
				return self;
			})
		);
	}
}
