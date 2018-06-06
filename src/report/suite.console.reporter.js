const TestConsoleReporter = require('./test.console.reporter')

/** Class implementing Suite Console reporter
 * @memberOf Reporter
 * */
class SuiteConsoleReporter {
	constructor(long) {
		this.logger = console
		this.long = long
	}

	suiteStarted(suite) {
		this.logger.log(`Suite started: ${suite.name}`)
	}

	suiteDone(suiteResults) {
		const summary = this._processResults(suiteResults)
		this.logger.log(`Suite done:`)
		this.logger.log(`   passed: ${summary.passed}`)
		this.logger.log(`   failed: ${summary.failed}`)
		this.logger.log(`   broken: ${summary.broken}`)
	}

	get testReporter() {
		return new TestConsoleReporter(this.long)
	}

	_processResults(suiteResults) {
		const summary = {
			passed: 0,
			failed: 0,
			broken: 0
		}
		for (let result of suiteResults.values()) {
			const status = result.status
			summary[status]++
		}
		return summary
	}
}

module.exports = SuiteConsoleReporter
