const { SuiteContext, SuiteConsoleReporter, SuiteAllureReporter } = require('taf')
const UiTestContext = require('./ui.test.context')

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