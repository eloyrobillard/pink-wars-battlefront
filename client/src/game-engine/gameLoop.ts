import { Squadron } from './game-objects/squadron';
import { Maybe, Some, None } from './types/index';
import Pool from './game-objects/pool';

const FPS = 30; // NOTE p5.draw ~= 76 fps
const fixedDeltaTime = 1 / FPS;
const fixedDeltaMsec = 1000 / FPS;
let frameStart = 0;

const POOL_LEN = 6;

function start () {
	frameStart = performance.now();

	Pool.set(Array.from({ length: POOL_LEN }, (_, i) => new Squadron(i, 255 / (i + 1))));
	Pool.map((squadron) => {
		squadron.start();
		return squadron;
	});
}

function frameIsReady () {
	const now = performance.now();
	const delta = now - frameStart;
	if (delta >= fixedDeltaMsec) {
		frameStart = performance.now();
		return true;
	}
	return false;
}

// perform routine squadron update
function update () {
	Pool.map((squadron) => {
		squadron.update();
		return squadron;
	});
}

function removeSquadron(squadId: number) {
	Pool.remove(squadId);
}

function findSquadron(cb: (squadron: Squadron) => boolean): Maybe<Squadron> {
	for (let i = 0; i < POOL_LEN; i += 1) {
		const current = Pool.get(i);
		if (cb(current)) {
			return new Some(current);
		}
	}
	return new None();
}

const Game = { FPS, fixedDeltaTime, start, frameIsReady, Pool, update, removeSquadron, findSquadron };

export default Game;
