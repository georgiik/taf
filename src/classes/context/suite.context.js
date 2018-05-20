const TestContext = require('./test.context')
const SuiteReporter = require('../report/suite.reporter')

class SuiteContext {
	constructor() {
		this.suiteReporter = new SuiteReporter()
	}
	get testContext() {
		return new TestContext(this.suiteReporter.testReporter)
	}
}

module.exports = SuiteContext