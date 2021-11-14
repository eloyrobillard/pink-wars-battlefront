import { Maybe, Some, None } from '../types/index';
import { Missile } from '../game-objects/missile';
import { Transform2D } from './index';
import GameApi from '../GameApi';

export class Missiles {
  curr = 0;
	missiles: Maybe<Missile>[] = Array.from({ length: 20 });

	constructor (public transform: Transform2D) {}

	updateFireCounter = (() => {
		let timer = Math.floor(Math.random() * 40);

		return GameApi.setTimer(45 - timer, () => {
			timer = Math.floor(Math.random() * 40);
			const missile = Missile.fire(
				this.transform.position,
				this.transform.rot, 
        this.destroy /* this.type */
			);
			// delete this.missiles[0];
			this.insert(missile);
		});
	})();

  private insert(missile: Missile) {
    this.missiles[this.curr] = new Some(missile);
    if (this.curr + 1 < this.missiles.length) {
      this.curr += 1;
    } else {
      this.curr = 0;
    }
  }

  destroy() {

  }

	update () {
		this.updateFireCounter();

		this.missiles.map((missile) => missile.map((self) => {
      self.update();
      return self;
    }));
	}
}
