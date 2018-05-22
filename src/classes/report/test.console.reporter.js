const Logger = require('../log/logger')

class TestConsoleReporter {
	constructor(long) {
		this.logger = new Logger()
		this.long = long
		this.indent = 0
		this.step = 3
	}

	beforeTest(test) {
		this.indent += this.step
		if (this.long) {
			this.logger.log()
			this.testRow = `${' '.repeat(this.indent)}Test: ${test.name}`
			this.logger.log(this.testRow)
		}
	}

	afterTest(test, result) {
		this.logger.log(`${' '.repeat(this.indent)}Test done: ${test.name}: ${result.status}`)
		this.indent -= this.step
		this.logger.print()
	}

	testStarted(test) {
		this.indent += this.step
		if (this.long) {
			this.testRow = `${' '.repeat(this.indent)}test`
			this.logger.log(this.testRow)
		}
	}

	testDone(result) {
		this._reportError(result)
		this.indent -= this.step
	}

	stepStarted(name) {
		this.indent += this.step
		if (this.long) {
			this.logger.log(`${' '.repeat(this.indent)}${name}`)
		}
	}

	stepDone(status) {
		this.indent -= this.step
	}

	addLabel(name, value) {
	}

	feature(feature) {
	}

	story(story) {
	}

	beforeStarted(name) {
		this.indent += this.step
		if (this.long) {
			this.logger.log(`${' '.repeat(this.indent)}${name}`)
		}
	}

	beforeDone(result) {
		this._reportError(result)
		this.indent -= this.step
	}

	afterStarted(name) {
		this.indent += this.step
		if (this.long) {
			this.logger.log(`${' '.repeat(this.indent)}${name}`)
		}
	}

	afterDone(result) {
		this._reportError(result)
		this.indent -= this.step
	}

	_reportError(rsult) {
		const { result, status} = rsult
		if (status === 'failed' || status === 'broken') {
			this.logger.log()
			this.logger.log(`${' '.repeat(this.indent)}${result.stack}`)
			this.logger.log()
		}
	}

}

module.exports = TestConsoleReporter
