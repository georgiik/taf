const TestReporter = require('./test.reporter')
const SuiteConsoleReporter = require('./suite.console.reporter')

class SuiteReporter {
	constructor() {
		this.reporters = []
		this.addReporter(new SuiteConsoleReporter())
	}
	addReporter(reporter) {
		this.reporters.push(reporter)
	}
	suiteStarted(name) {
		this.reporters.forEach(reporter => reporter.suiteStarted(name))
	}

	suiteDone(suiteResults) {
		this.reporters.forEach(reporter => reporter.suiteDone(suiteResults))
	}

	get testReporter() {
		const reporter = new TestReporter()
		reporter.reporters = this.reporters.map(r => r.testReporter)
		return reporter
	}
}

module.exports = SuiteReporter