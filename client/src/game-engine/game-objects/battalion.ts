import { Maybe, Some, None } from '../types/index';
import { Squadron } from './squadron';
import GameApi from '../GameApi';
import { Ship } from './ship';

export class Battalion {
  squadrons: Maybe<Squadron>[];
  battalionId: number;
  color: number;

  constructor(id: number, color: number) {
    this.battalionId = id;
    this.color = color;
    this.squadrons = this.getSquadrons();
  }

  private getSquadrons(): Maybe<Squadron>[] {
    const squadrons: Maybe<Squadron>[] = Array.from({ length: 3}, () => new None());
    const spots = GameApi.battleStartSpots();
    for (let i = 0; i < squadrons.length; i += 1) {
      squadrons[i] = new Some(new Squadron(this.battalionId, i, spots[i]))
    }
    return squadrons;
  }

  enrollSquadron() {
    this.squadrons.push(new Some(new Squadron(this.battalionId, this.squadrons.length)));
  }

  mapShips(cb: (ship: Ship) => Ship) {
    this.squadrons.map((maybeSquadron) => {
      maybeSquadron.map((squadron) => {
        squadron.map(cb);
        return squadron;
      });
      return maybeSquadron;
    })
  }

  start() {
    this.squadrons.map((maybeSquadron) => {
      maybeSquadron.map((squadron) => {
        squadron.start();
        return squadron;
      });
      return maybeSquadron;
    });
  }

  update() {
    this.squadrons.map((maybeSquadron) => {
      maybeSquadron.map((squadron) => {
        squadron.update();
        return squadron;
      });
      return maybeSquadron;
    });
  }
}