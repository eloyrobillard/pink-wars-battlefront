import math from './math/index';
import Game from './game-engine/index';
import { Ship } from './types/index';
import Sketch from 'react-p5';
import p5Types from 'p5'; //Import this for typechecking and intellisense

export default function Canvas () {
	// let x = 500;
	// const y = 50;

	//See annotations in JS for more information
	const setup = (p5: p5Types, canvasParentRef: Element) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);

		// always fit canvas to window
		window.addEventListener('resize', () => p5.resizeCanvas(window.innerWidth, window.innerHeight));
	};

	const draw = (p5: p5Types) => {
		p5.background('#ffdbed');
		p5.noStroke();
		// p5.ellipse(x, y, 70, 70);
		Game.pool.map((ship, i) => {
			ship.addRot(1);
			const { body } = ship;
			const { x1, y1, x2, y2, x3, y3 } = body;
			p5.triangle(x1, y1, x2, y2, x3, y3);

			return ship;
		});
		
		// NOTE: Do not use setState in the draw function or in functions that are executed
		// in the draw function...
		// please use normal variables or class properties for these purposes
		// x++;
	};

	return <Sketch setup={setup} draw={draw} />;
}
