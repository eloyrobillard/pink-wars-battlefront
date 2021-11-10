import React from "react";
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense


export default function Canvas() {
  let x = 50;
	const y = 50;

	//See annotations in JS for more information
	const setup = (p5: p5Types, canvasParentRef: Element) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		p5.createCanvas(500, 500).parent(canvasParentRef);
	};

	const draw = (p5: p5Types) => {
		p5.background('#ffdbed');
		p5.ellipse(x, y, 70, 70);
    // NOTE: Do not use setState in the draw function or in functions that are executed
		// in the draw function...
		// please use normal variables or class properties for these purposes
		x++;
	};

	return <Sketch setup={setup} draw={draw} />;
}