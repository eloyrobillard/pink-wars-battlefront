import { Squadron } from '../game-objects/squadron';
import { Maybe, Some, None } from '../types/index';
import Behavior from '../game-objects/behavior';
import { Ship } from '../game-objects/ship';
import GameApi from '../GameApi';
import Game from '../gameLoop';

export class FightMaker {
	opponent: Maybe<Squadron> = new None();

	constructor (public battalionId: number, private leader: Ship) {}

	update (leader: Ship) {
		this.leader = leader;
		this.querySwitchOpponent();
		if (this.opponent.isSome) {
			this.updateFight(this.opponent.unwrap()!);
			this.fireNow();
		} else {
			this.queryOpponent();
		}
	}

  /**
   * Switch opponent on a timer, to keep squadrons from circling.
   */
	private querySwitchOpponent = GameApi.setTimer(150, () => this.queryOpponent());

	/**
   * Tells squadron to shoot.
   */
	fireNow () {}

	onDestroy () {
		this.opponent.map((opponent) => {
			opponent.fightMaker.onDestroyOpponent();
			return opponent;
		});
	}

	onDestroyOpponent () {
		this.opponent = new None();
	}

	updateFight (opponent: Squadron) {
    if (this.leader.anchor.isNone || this.leader.anchor.unwrap()!.anchor !== opponent.leader) {
      Behavior.setAnchor(this.leader, opponent.leader);
    }
	}

	queryOpponent () {
		let maybeOpponent: Maybe<Squadron>;
		while ((maybeOpponent = Game.Pool.getRand(this.battalionId)).isNone) {}

		this.opponent = maybeOpponent;
		this.updateFight(maybeOpponent.unwrap()!);
	}
}
