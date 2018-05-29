const TestContext = require('./test.context')
const SuiteReporter = require('../report/suite.reporter')

/** @namespace Context */

/** Class implementing Suite context
 * @memberOf Context
 * */
class SuiteContext {
	constructor() {
		/**  */
		this.suiteReporter = new SuiteReporter()
	}
	get testContext() {
		return new TestContext(this.suiteReporter.testReporter)
	}
}

module.exports = SuiteContext