import { Maybe, Some, None } from '../types/index';
import { Missile } from '../game-objects/missile';
import { Transform2D } from './index';
import GameApi from '../GameApi';

export class Missiles {
  curr = 0;
	missiles: Maybe<Missile>[] = Array.from({ length: 10 }, () => new None());

	constructor (public transform: Transform2D) {}

	private fireCounter = GameApi.setTimer(50 - Math.floor(Math.random() * 40), () => {
    const missile = Missile.fire(
      this.transform.position,
      this.transform.rot,
      this.curr,
      this.destroy /* this.type */
    );
    // delete this.missiles[0];
    this.insert(missile);
  });

  private updateFireCounter() {
    this.fireCounter = GameApi.setTimer(50 - Math.floor(Math.random() * 40), () => {
      const missile = Missile.fire(
        this.transform.position,
        this.transform.rot,
        this.curr,
        this.destroy /* this.type */
      );
      // delete this.missiles[0];
      this.insert(missile);
    });
  }

  private insert(missile: Missile) {
    this.missiles[this.curr] = new Some(missile);
    if (this.curr + 1 < this.missiles.length) {
      this.curr += 1;
    } else {
      this.curr = 0;
    }
  }

  destroy(id: number) {
    this.missiles[id] = new None();
  }

	update () {
		if (this.fireCounter() === 0) {
      this.updateFireCounter();
    }

		this.missiles.map((missile) => missile.map((self) => {
      self.update();
      return self;
    }));
	}
}
