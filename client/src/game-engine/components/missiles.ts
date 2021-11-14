import { Transform2D } from './index';
import { Missile } from '../game-objects/missile';
import GameApi from '../GameApi';

export class Missiles {
	missiles: Missile[] = [];

	constructor (public transform: Transform2D) {}

	updateFireCounter = (() => {
		let timer = Math.floor(Math.random() * 40);

		return GameApi.setTimer(45 - timer, () => {
			timer = Math.floor(Math.random() * 40);
			const missile = Missile.fire(
				this.transform.position,
				this.transform.rot /* this.type */
			);
			// delete this.missiles[0];
			this.missiles.push(missile);
		});
	})();

	resetMissiles = GameApi.setTimer(60, () => {
		for (let i = 0; i < this.missiles.length / 2; i += 1) {
			delete this.missiles[i];
		}
	});

	update () {
		this.updateFireCounter();
		this.resetMissiles();

		this.missiles.map((missile) => missile.update());
	}
}
