class Logger {
	constructor() {
		this.rows = []
	}
	log(...msg) {
		this.rows.push(msg.join(''))
	}
	print() {
		console.log(this.rows.join('\n'))
	}
}

module.exports = Logger