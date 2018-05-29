const Reporter = require('../report/test.reporter')
const ConsoleReporter = require('../report/test.console.reporter')

/**
 * Class implementing Test Context.
 * @memberOf Context
 * */
class TestContext {
	/** @param reporter {TestReporter}
	 */
	constructor(reporter) {
		this.reporter = reporter
	}
}

module.exports = TestContext