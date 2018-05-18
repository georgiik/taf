const Logger = require('../log/logger')

class ConsoleReporter {
	constructor() {
		this.logger = new Logger()
		this.indent = 0
	}

	suiteStarted(name) {
		this.logger.log(`Suite started: ${name}`)
	}

	suiteDone(name) {
		this.logger.log(`Suite done`)
		this.logger.log()
		this.logger.print()
	}

	testStarted(name) {
		this.indent += 2
		this.testRow = `${' '.repeat(this.indent)}Test: ${name}`
		this.logger.log(this.testRow)
	}

	testDone(test) {
		if (test.status === 'failed' || test.status === 'broken') {
			const error = test.result
			this.logger.log()
			this.logger.log(`${' '.repeat(this.indent)}${error.stack}`)
			this.logger.log()
		}
		this.logger.log(`${' '.repeat(this.indent)}Test done: ${test.status}`)
		this.indent -= 2
	}

	stepStarted(name) {
		this.indent += 2
		this.logger.log(`${' '.repeat(this.indent)}${name}`)
	}

	stepDone(status) {
		this.indent -= 2
	}
}

module.exports = ConsoleReporter
