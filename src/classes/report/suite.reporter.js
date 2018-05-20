const TestReporter = require('./test.reporter')

class SuiteReporter {
	constructor() {
		this.reporters = []
	}
	addReporter(reporter) {
		this.reporters.push(reporter)
	}
	suiteStarted(name) {
		this.reporters.forEach(reporter => reporter.suiteStarted(name))
	}

	suiteDone() {
		this.reporters.forEach(reporter => reporter.suiteDone())
	}

	get testReporter() {
		const reporter = new TestReporter()
		reporter.reporters = this.reporters.map(r => r.testReporter)
		return reporter
	}
}

module.exports = SuiteReporter