const UiTestContext = require('./ui.test.context')
const { SuiteContext } = require('taf')
const { SuiteConsoleReporter, SuiteAllureReporter } = require('taf')

class UiSuiteContext extends SuiteContext {
	constructor() {
		super()
		this.suiteReporter.addReporter(new SuiteAllureReporter())
		this.suiteReporter.addReporter(new SuiteConsoleReporter(true))
	}
	get testContext() {
		return new UiTestContext(this.suiteReporter.testReporter)
	}
}

module.exports = UiSuiteContext