import { Vec2 } from './types/index';

/**
 * Sets a callback on a timer (in FPS).
 */
function setTimer (count: number, action: () => void) {
	let counter = 0;

	return () => {
		if (counter + 1 < count) {
			return (counter += 1);
		}
		action();
		return (counter = 0);
	};
}

const entrySpots = [
	{ pos: new Vec2(window.innerWidth / 6, 0), rot: 270 },
	{ pos: new Vec2(window.innerWidth / 4, 0), rot: 270 },
	{ pos: new Vec2(window.innerWidth / 2, 0), rot: 270 },
	{ pos: new Vec2(window.innerWidth * 3 / 4, 0), rot: 270 },
	{ pos: new Vec2(window.innerWidth * 5 / 6, 0), rot: 270 },
	{ pos: new Vec2(window.innerWidth, window.innerHeight / 3), rot: 180 },
	{ pos: new Vec2(window.innerWidth, window.innerHeight / 2), rot: 180 },
	{ pos: new Vec2(window.innerWidth, window.innerHeight * 2 / 3), rot: 180 },
	{ pos: new Vec2(window.innerWidth / 6, 0), rot: 90 },
	{ pos: new Vec2(window.innerWidth / 4, 0), rot: 90 },
	{ pos: new Vec2(window.innerWidth / 2, 0), rot: 90 },
	{ pos: new Vec2(window.innerWidth * 3 / 4, 0), rot: 90 },
	{ pos: new Vec2(window.innerWidth * 5 / 6, 0), rot: 90 },
	{ pos: new Vec2(window.innerWidth, window.innerHeight / 3), rot: 0 },
	{ pos: new Vec2(window.innerWidth, window.innerHeight / 2), rot: 0 },
	{ pos: new Vec2(window.innerWidth, window.innerHeight * 2 / 3), rot: 0 },
];

function enterBattlefield() {
	return entrySpots[Math.random() * entrySpots.length];
}

const GameApi = {
	setTimer,
	enterBattlefield
};

export default GameApi;
