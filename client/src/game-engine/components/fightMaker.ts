import { Squadron } from '../game-objects/squadron';
import { Maybe, Some, None } from '../types/index';
import Behavior from '../game-objects/behavior';
import { Ship } from '../game-objects/ship';
import Game from '../gameLoop';

export class FightMaker {
  inCombat = false;
  opponent: Maybe<Squadron> = new None();

  constructor(public squadronId: number, private leader: Ship) {}

  update(leader: Ship) {
    this.leader = leader;
    if (this.opponent.isSome) {
      this.updateFight(this.opponent.unwrap()!);
      this.fireNow();
    } else {
      this.queryOpponent();
    }
  }

  /**
   * Tells squadron to shoot.
   */
  fireNow() {

  }

  onDestroy() {
    this.opponent.map((opponent) => {
      opponent.fightMaker.onDestroyOpponent();
      return opponent;
    });
  }

  onDestroyOpponent() {
    this.queryOpponent();
  }

  updateFight(opponent: Squadron) {
    Behavior.setAnchor(this.leader, opponent.leader);
  }

  queryOpponent() {
    const opponent = Game.Pool.getRand(this.squadronId);
    this.opponent = new Some(opponent);
    this.updateFight(opponent);
  }
}