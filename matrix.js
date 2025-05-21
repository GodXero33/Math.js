export default class Matrix {
	constructor (rows = 1, cols = 1, elements = null) {
		if (!Number.isInteger(rows) || rows < 1) throw new Error('Invalid row count');
		if (!Number.isInteger(cols) || cols < 1) throw new Error('Invalid column count');
		if (elements !== null && (!Array.isArray(elements) || elements.length !== rows || elements.some(row =>!Array.isArray(row) || row.length !== cols || row.some(value => typeof value != 'number')))) throw new Error('Invalid elements array');

		this.rows = rows;
		this.cols = cols;
		this.matrix = elements ? Array.from({ length: rows }, (_, y) => Array.from({ length: cols }, (_, x) => elements[y][x])) : Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0));
	}
}
