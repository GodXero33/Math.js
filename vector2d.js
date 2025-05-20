export default class Vector2D {
	constructor (x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	set (x = 0, y = 0) {
		this.x = x;
		this.y = y;
		return this;
	}

	setX (x = 0) {
		this.x = x;
		return this;
	}

	setY (y = 0) {
		this.y = y;
		return this;
	}

	add (vec) {
		this.x += vec.x;
		this.y += vec.y;
		return this;
	}

	addScalar (scalar) {
		this.x += scalar;
		this.y += scalar;
		return this;
	}

	addX (x = 0) {
		this.x += x;
		return this;
	}

	addY (y = 0) {
		this.y += y;
		return this;
	}

	sub (vec) {
		this.x -= vec.x;
		this.y -= vec.y;
		return this;
	}

	subScalar (scalar) {
		this.x -= scalar;
		this.y -= scalar;
		return this;
	}

	subX (x = 0) {
		this.x -= x;
		return this;
	}

	subY (y = 0) {
		this.y -= y;
		return this;
	}

	mult (vec) {
		this.x *= vec.x;
		this.y *= vec.y;
		return this;
	}

	multScalar (scalar) {
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}

	multX (x) {
		this.x *= x;
		return this;
	}

	multY (y) {
		this.y *= y;
		return this;
	}

	div (vec) {
		this.x /= vec.x;
		this.y /= vec.y;
		return this;
	}

	divScalar (scalar) {
		this.x /= scalar;
		this.y /= scalar;
		return this;
	}

	divX (x) {
		this.x /= x;
		return this;
	}

	divY (y) {
		this.y /= y;
		return this;
	}

	magnitude () {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	magnitudeSquared () {
		return this.x * this.x + this.y * this.y;
	}

	normalized () {
		const len = this.magnitude();

		this.x /= len;
		this.y /= len;
		return this;
	}

	dot (vec) {
		return this.x * vec.x + this.y * vec.y;
	}

	cross (vec) {
		return this.x * vec.y - this.y * vec.x;
	}

	distanceTo (vec) {
		return Math.sqrt((this.x - vec.x) * (this.x - vec.x) + (this.y - vec.y) * (this.y - vec.y));
	}

	angleWith (vec) {
		return Math.acos(this.dot(vec) / this.cross(vec));
	}

	rotate (angle) {
		const sin = Math.sin(angle);
		const cos = Math.cos(angle);

		const x = this.x * cos - this.y * sin;
		const y = this.x * sin + this.y * cos;

		this.x = x;
		this.y = y;

		return this;
	}

	copy (vec) {
		this.x = vec.x;
		this.y = vec.y;
		return this;
	}

	clone () {
		return new Vector2D(this.x, this.y);
	}
}
