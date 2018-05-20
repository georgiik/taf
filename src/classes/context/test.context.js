const Reporter = require('../report/test.reporter')
const ConsoleReporter = require('../report/console.reporter')

class TestContext {
	constructor(reporter) {
		this.reporter = reporter
	}
}

module.exports = TestContext