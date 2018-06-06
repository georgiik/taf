const Logger = require('../logger')

/** Class implementing Test Console reporter
 * @memberOf Reporter
 * */
class TestConsoleReporter {
	constructor(long) {
		this.logger = new Logger()
		this.long = long
		this.indent = 0
		this.step = 3
	}

	addLabel(name, value) {}

	feature(feature) {}

	story(story) {}

	testStarted(test) {
		this.indent += this.step
		if (this.long) {
			this.testRow = `${' '.repeat(this.indent)}Test: ${test.name}`
			this.logger.log(this.testRow)
		}
	}

	testDone(test, result) {
		this.logger.log(`${' '.repeat(this.indent)}Test: ${test.name}: ${result.status}`)
		this.indent -= this.step
		this.logger.print()
	}

	testBodyStarted(test) {
		this.indent += this.step
		if (this.long) {
			this.testRow = `${' '.repeat(this.indent)}testBody`
			this.logger.log(this.testRow)
		}
	}

	testBodyDone(result) {
		this._reportError(result)
		this.indent -= this.step
	}

	beforeEachStarted(name) {
		this.indent += this.step
		if (this.long) {
			this.logger.log(`${' '.repeat(this.indent)}${name}`)
		}
	}

	beforeEachDone(result) {
		this._reportError(result)
		this.indent -= this.step
	}

	afterEachStarted(name) {
		this.indent += this.step
		if (this.long) {
			this.logger.log(`${' '.repeat(this.indent)}${name}`)
		}
	}

	afterEachDone(result) {
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
