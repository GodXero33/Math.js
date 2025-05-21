export default class Vector3D {
	constructor(x = 0, y = 0, z = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	set (x = 0, y = 0, z = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
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

	setZ (z = 0) {
		this.z = z;
		return this;
	}

	add (vec) {
		this.x += vec.x;
		this.y += vec.y;
		this.z += vec.z;
		return this;
	}

	addScalar (scalar) {
		this.x += scalar;
		this.y += scalar;
		this.z += scalar;
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

	addZ (z = 0) {
		this.z += z;
		return this;
	}

	sub (vec) {
		this.x -= vec.x;
		this.y -= vec.y;
		this.z -= vec.z;
		return this;
	}

	subScalar (scalar) {
		this.x -= scalar;
		this.y -= scalar;
		this.z -= scalar;
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

	subZ (z = 0) {
		this.z -= z;
		return this;
	}

	mult (vec) {
		this.x *= vec.x;
		this.y *= vec.y;
		this.z *= vec.z;
		return this;
	}

	multScalar (scalar) {
		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;
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

	multZ (z) {
		this.z *= z;
		return this;
	}

	div (vec) {
		if (vec.x === 0 || vec.y === 0 || vec.z === 0) return this;

		this.x /= vec.x;
		this.y /= vec.y;
		this.z /= vec.z;
		return this;
	}

	divScalar (scalar) {
		if (scalar === 0) return this;

		this.x /= scalar;
		this.y /= scalar;
		this.z /= scalar;
		return this;
	}

	divX (x) {
		if (x === 0) return this;

		this.x /= x;
		return this;
	}

	divY (y) {
		if (y === 0) return this;

		this.y /= y;
		return this;
	}

	divZ (z) {
		if (z === 0) return this;

		this.z /= z;
		return this;
	}

	magnitude () {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}

	magnitudeSquared () {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}

	normalized () {
		const len = this.magnitude();

		if (len === 0) return this;

		this.x /= len;
		this.y /= len;
		this.z /= len;

		return this;
	}

	dot (vec) {
		return this.x * vec.x + this.y * vec.y + this.z * vec.z;
	}

	cross (vec) {
		const x = this.y * vec.z - this.z * vec.y;
		const y = this.z * vec.x - this.x * vec.z;
		const z = this.x * vec.y - this.y * vec.x;

		this.x = x;
		this.y = y;
		this.z = z;
		return this;
	}

	distanceTo (vec) {
		return Math.sqrt(
			(this.x - vec.x) ** 2 +
			(this.y - vec.y) ** 2 +
			(this.z - vec.z) ** 2
		);
	}

	angleWith (vec) {
		const dot = this.dot(vec);
		const mag1 = this.magnitude();
		const mag2 = vec.magnitude();

		if (mag1 === 0 || mag2 === 0) return 0;

		return Math.acos(dot / (mag1 * mag2));
	}

	rotateX (angle) {
		const cos = Math.cos(angle);
		const sin = Math.sin(angle)

		const y = this.y * cos - this.z * sin;
		const z = this.y * sin + this.z * cos;

		this.y = y;
		this.z = z;

		return this;
	}

	rotateY (angle) {
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);

		const x = this.x * cos + this.z * sin;
		const z = -this.x * sin + this.z * cos;

		this.x = x;
		this.z = z;

		return this;
	}

	rotateZ (angle) {
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);

		const x = this.x * cos - this.y * sin;
		const y = this.x * sin + this.y * cos;

		this.x = x;
		this.y = y;

		return this;
	}

	rotateAroundAxis (axis, angle) {
		// Rodrigues' rotation formula (https://en.wikipedia.org/wiki/Rodrigues%27_rotation_formula)
		const u = axis.normalized();
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);

		const dot = this.dot(u);
		const crossX = u.y * this.z - u.z * this.y;
		const crossY = u.z * this.x - u.x * this.z;
		const crossZ = u.x * this.y - u.y * this.x;

		this.x = this.x * cos + crossX * sin + u.x * dot * (1 - cos);
		this.y = this.y * cos + crossY * sin + u.y * dot * (1 - cos);
		this.z = this.z * cos + crossZ * sin + u.z * dot * (1 - cos);

		return this;
	}

	lerp (vec, t) {
		this.x += (vec.x - this.x) * t;
		this.y += (vec.y - this.y) * t;
		this.z += (vec.z - this.z) * t;
		return this;
	}

	reflect (normal) {
		const dot = this.dot(normal);
		this.x -= 2 * dot * normal.x;
		this.y -= 2 * dot * normal.y;
		this.z -= 2 * dot * normal.z;
		return this;
	}

	projectOnto (vec) {
		const dot = this.dot(vec);
		const magSq = vec.magnitudeSquared();

		if (magSq === 0) return this;

		this.x = (dot / magSq) * vec.x;
		this.y = (dot / magSq) * vec.y;
		this.z = (dot / magSq) * vec.z;

		return this;
	}

	equals(vec) {
		return this.x === vec.x && this.y === vec.y && this.z === vec.z;
	}

	isZero() {
		return this.x === 0 && this.y === 0 && this.z === 0;
	}

	copy(vec) {
		this.x = vec.x;
		this.y = vec.y;
		this.z = vec.z;
		return this;
	}

	clone() {
		return new Vector3D(this.x, this.y, this.z);
	}

	toString() {
		return `Vector3D<${this.x}, ${this.y}, ${this.z}>`;
	}

	static create (x = 0, y = 0, z = 0) {
		return new Vector3D(x, y, z);
	}

	static clone (vec) {
		return new Vector3D(vec.x, vec.y, vec.z);
	}

	static add (vec1, vec2) {
		return new Vector3D(vec1.x + vec2.x, vec1.y + vec2.y, vec1.z + vec2.z);
	}

	static sub (vec1, vec2) {
		return new Vector3D(vec1.x - vec2.x, vec1.y - vec2.y, vec1.z - vec2.z);
	}

	static mult (vec1, vec2) {
		return new Vector3D(vec1.x * vec2.x, vec1.y * vec2.y, vec1.z * vec2.z);
	}

	static div (vec1, vec2) {
		return new Vector3D(
			vec2.x === 0 ? 0 : vec1.x / vec2.x,
			vec2.y === 0 ? 0 : vec1.y / vec2.y,
			vec2.z === 0 ? 0 : vec1.z / vec2.z
		);
	}

	static addScalar (vec, scalar) {
		return new Vector3D(vec.x + scalar, vec.y + scalar, vec.z + scalar);
	}

	static subScalar (vec, scalar) {
		return new Vector3D(vec.x - scalar, vec.y - scalar, vec.z - scalar);
	}

	static multScalar (vec, scalar) {
		return new Vector3D(vec.x * scalar, vec.y * scalar, vec.z * scalar);
	}

	static divScalar (vec, scalar) {
		if (scalar === 0) return new Vector3D(0, 0, 0);

		return new Vector3D(vec.x / scalar, vec.y / scalar, vec.z / scalar);
	}

	static magnitude (vec) {
		return Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
	}

	static magnitudeSquared (vec) {
		return vec.x * vec.x + vec.y * vec.y + vec.z * vec.z;
	}

	static normalized (vec) {
		const mag = Vector3D.magnitude(vec);
		return mag === 0 ? new Vector3D() : new Vector3D(vec.x / mag, vec.y / mag, vec.z / mag);
	}

	static dot (vec1, vec2) {
		return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
	}

	static cross (vec1, vec2) {
		return new Vector3D(
			vec1.y * vec2.z - vec1.z * vec2.y,
			vec1.z * vec2.x - vec1.x * vec2.z,
			vec1.x * vec2.y - vec1.y * vec2.x
		);
	}

	static distance (vec1, vec2) {
		return Math.sqrt(
			(vec1.x - vec2.x) ** 2 +
			(vec1.y - vec2.y) ** 2 +
			(vec1.z - vec2.z) ** 2
		);
	}

	static lerp (vec1, vec2, t) {
		return new Vector3D(
			vec1.x + (vec2.x - vec1.x) * t,
			vec1.y + (vec2.y - vec1.y) * t,
			vec1.z + (vec2.z - vec1.z) * t
		);
	}

	static reflect (vec, normal) {
		const dot = Vector3D.dot(vec, normal);
		return new Vector3D(
			vec.x - 2 * dot * normal.x,
			vec.y - 2 * dot * normal.y,
			vec.z - 2 * dot * normal.z
		);
	}

	static project (vec, onto) {
		const dot = Vector3D.dot(vec, onto);
		const magSq = Vector3D.magnitudeSquared(onto);

		if (magSq === 0) return new Vector3D();

		return new Vector3D(
			(dot / magSq) * onto.x,
			(dot / magSq) * onto.y,
			(dot / magSq) * onto.z
		);
	}
}
