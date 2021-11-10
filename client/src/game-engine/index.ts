import pool from './state/pool';

const FPS = 30;
const fixedDeltaTime = 1 / FPS;

function gameLoop() {

}

const Game = { FPS, fixedDeltaTime, gameLoop, pool };

export default Game;