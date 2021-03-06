export class Vec2 {
	// in pixels
	constructor (public x: number, public y: number) {}

	/**
	 * Returns direction towards pos, to use with lerp.
	 * @param pos position to move towards
	 */
	vecTo({ x, y }: Vec2): Vec2 {
		return new Vec2(x - this.x, y - this.y);
	}

	/**
	 * Returns a vector pointing away from pos, to use with lerp.
	 * @param pos position to move away from
	 */
	vecAwayFrom(pos: Vec2): Vec2 {
		return this.vecTo(pos).reverse();
	}

	reverse(): Vec2 {
		return new Vec2(-this.x, -this.y)
	}

	/**
	 * Returns vector going from (x1, y1) to (x2, y2)
	 * @param x1 X-coordinate of first point
	 * @param y1 Y-coordinate of first point
	 * @param x2 X-coordinate of second point
	 * @param y2 Y-coordinate of second point
	 * @returns Vector
	 */
	static toVec(x1: number, y1: number, x2: number, y2: number): Vec2 {
		return new Vec2(x2 - x1, y2 - y1);
	}

	lerp(dest: Vec2, time: number) {
		const { x, y } = this;
		const { x: dx, y: dy } = dest;
		const dt = 1 - time;
		return new Vec2(
				x * dt + dx * time,
				y * dt + dy * time
			);
	}

	distance(other: Vec2) {
		const { x: dx, y: dy } = this.vecTo(other);
		return Math.sqrt(dx**2 + dy**2);
	}

	magnitude() {
		return Math.sqrt(this.x**2 + this.y**2);
	}

	/**
	 * @returns rotation in degrees
	 */
	toRotation() {
		return (((Math.atan2(-this.y, this.x) / Math.PI * 180) % 360) + 360) % 360;
	}

	/**
	 * Returns the product between the magnitude of other and the length of the projection of this on other.
	 * @param other 
	 * @returns Number
	 */
	dotProd(other: Vec2) {
		return (this.x * other.x + this.y * other.y);
	}

	/**
	 * Returns the normal to the polygon formed by this and other, with a magnitude equal to the area of that polygon.
	 */
	crossProd(other: Vec2) {
		return (this.x * other.x - this.y * other.y);
	}

	/**
	 * Returns projection of this along other, e.g. projecting along the x-axis is equal this x.
	 * 
	 * LINK https://www.wikiwand.com/en/Vector_projection
	 * @returns 'length' of this along other
	 */
	project(other: Vec2) {
		const dotProd = this.dotProd(other);
		return other.scalarMul(dotProd / (other.x**2 + other.y**2));
	}

	/**
	 * Return a copy of this with its coordinates multiplied by some number. 
	 * @param scalar Just a number.
	 */
	scalarMul(scalar: number) {
		return new Vec2(this.x * scalar, this.y * scalar);
	}
}
