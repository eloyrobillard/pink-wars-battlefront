export class vec2 {
	// in pixels
	constructor (public x: number, public y: number) {}

	/**
	 * Returns direction towards pos, to use with lerp.
	 * @param pos position to move towards
	 */
	vecTo({ x, y }: vec2): vec2 {
		return new vec2(x - this.x, y - this.y);
	}

	/**
	 * Returns a vector pointing away from pos, to use with lerp.
	 * @param pos position to move away from
	 */
	vecAwayFrom(pos: vec2): vec2 {
		return this.vecTo(pos).reverse();
	}

	private reverse(): vec2 {
		return new vec2(-this.x, -this.y)
	}
}
