import { Squadron } from './game-objects/squadron';
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
	Pool.replace(squadId);
}

const Game = { FPS, fixedDeltaTime, start, frameIsReady, Pool, update, removeSquadron };

export default Game;
