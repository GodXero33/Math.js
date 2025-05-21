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
		if (vec.x === 0 || vec.y === 0) return this;

		this.x /= vec.x;
		this.y /= vec.y;
		return this;
	}

	divScalar (scalar) {
		if (scalar === 0) return this;

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

		if (len === 0) return this;

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
		return Math.sqrt((this.x - vec.x) ** 2 + (this.y - vec.y) ** 2);
	}

	angleWith (vec) {
		const dot = this.dot(vec);
		const mag1 = this.magnitude();
		const mag2 = vec.magnitude();

		if (mag1 === 0 || mag2 === 0) return 0;

		return Math.acos(dot / (mag1 * mag2));
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

	rotateBy (angle) {
		return this.rotate(angle);
	}

	rotateAround (vec, angle) {
		this.sub(vec).rotate(angle).add(vec);
		return this;
	}

	rotateAroundBy (vec, angle) {
		return this.rotateAround(vec, angle);
	}

	angle () {
		return Math.atan2(this.y, this.x);
	}

	lerp (vec, fact) {
		this.x += (vec.x - this.x) * fact;
		this.y += (vec.y - this.y) * fact;
		return this;
	}

	reflect (normal) {
		const dot = this.dot(normal);
		this.x -= 2 * dot * normal.x;
		this.y -= 2 * dot * normal.y;
		return this;
	}

	projectOnto (vec) {
		const dot = this.dot(vec);
		const magSq = vec.magnitudeSquared();

		this.x = (dot / magSq) * vec.x;
		this.y = (dot / magSq) * vec.y;
		return this;
	}

	perpendicular () {
		const x = -this.y;
		this.y = this.x;
		this.x = x;
		return this;
	}

	clamp (minVec, maxVec) {
		this.x = Math.max(minVec.x, Math.min(this.x, maxVec.x));
		this.y = Math.max(minVec.y, Math.min(this.y, maxVec.y));
		return this;
	}

	equals (vec) {
		return this.x === vec.x && this.y === vec.y;
	}

	isZero () {
		return this.x === 0 && this.y === 0;
	}

	min (vec) {
		this.x = Math.min(vec.x, this.x);
		this.y = Math.min(vec.y, this.y);
		return this;
	}

	max (vec) {
		this.x = Math.max(vec.x, this.x);
		this.y = Math.max(vec.y, this.y);
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

	toString () {
		return `Vector2D<${this.x}, ${this.y}>`;
	}

	static create (x = 0, y = 0) {
		return new Vector2D(x, y);
	}

	static set (x = 0, y = 0) {
		return new Vector2D(x, y);
	}

	static clone (vec) {
		return new Vector2D(vec.x, vec.y);
	}
	
	static add (vec1, vec2) {
		return new Vector2D(vec1.x + vec2.x, vec1.y + vec2.y);
	}

	static sub (vec1, vec2) {
		return new Vector2D(vec1.x - vec2.x, vec1.y - vec2.y);
	}

	static mult (vec1, vec2) {
		return new Vector2D(vec1.x * vec2.x, vec1.y * vec2.y);
	}

	static div (vec1, vec2) {
		return new Vector2D(
			vec2.x === 0 ? 0 : vec1.x / vec2.x,
			vec2.y === 0 ? 0 : vec1.y / vec2.y
		);
	}

	static addScalar (vec, scalar) {
		return new Vector2D(vec.x + scalar, vec.y + scalar);
	}

	static subScalar (vec, scalar) {
		return new Vector2D(vec.x - scalar, vec.y - scalar);
	}

	static multScalar (vec, scalar) {
		return new Vector2D(vec.x * scalar, vec.y * scalar);
	}

	static divScalar (vec, scalar) {
		if (scalar === 0) return new Vector2D(0, 0);

		return new Vector2D(vec.x / scalar, vec.y / scalar);
	}

	static magnitude (vec) {
		return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
	}

	static magnitudeSquared (vec) {
		return vec.x * vec.x + vec.y * vec.y;
	}

	static normalized (vec) {
		const mag = Vector2D.magnitude(vec);
		return mag === 0 ? new Vector2D() : new Vector2D(vec.x / mag, vec.y / mag);
	}

	static dot (vec1, vec2) {
		return vec1.x * vec2.x + vec1.y * vec2.y;
	}

	static cross (vec1, vec2) {
		return vec1.x * vec2.y - vec1.y * vec2.x;
	}

	static rotate (vec, angle) {
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);

		return new Vector2D(vec.x * cos - vec.y * sin, vec.x * sin + vec.y * cos);
	}

	static rotateAround (vec, center, angle) {
		const offset = Vector2D.sub(vec, center);
		const rotated = Vector2D.rotate(offset, angle);

		return Vector2D.add(rotated, center);
	}

	static distance (vec1, vec2) {
		return Math.sqrt((vec1.x - vec2.x) ** 2 + (vec1.y - vec2.y) ** 2);
	}

	static lerp (vec1, vec2, t) {
		return new Vector2D(
			vec1.x + (vec2.x - vec1.x) * t,
			vec1.y + (vec2.y - vec1.y) * t
		);
	}

	static reflect (vec, normal) {
		const dot = Vector2D.dot(vec, normal);
		return Vector2D.sub(vec, Vector2D.multScalar(normal, 2 * dot));
	}

	static projectOnto (vec, onto) {
		const dot = Vector2D.dot(vec, onto);
		const magSq = Vector2D.magnitudeSquared(onto);

		if (magSq === 0) return new Vector2D();

		return Vector2D.multScalar(onto, dot / magSq);
	}

	static perpendicular (vec) {
		return new Vector2D(-vec.y, vec.x);
	}

	static clamp (vec, min, max) {
		return new Vector2D(
			Math.max(min.x, Math.min(vec.x, max.x)),
			Math.max(min.y, Math.min(vec.y, max.y))
		);
	}

	static min (vec1, vec2) {
		return new Vector2D(Math.min(vec1.x, vec2.x), Math.min(vec1.y, vec2.y));
	}

	static max (vec1, vec2) {
		return new Vector2D(Math.max(vec1.x, vec2.x), Math.max(vec1.y, vec2.y));
	}
}
