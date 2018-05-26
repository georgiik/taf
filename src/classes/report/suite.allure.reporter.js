const { AllureConfig, AllureRuntime } = require('allure2-js-commons')

const TestAllureReporter = require('./test.allure.reporter')

class SuiteAllureReporter {
	constructor() {
		const config = new AllureConfig()
		this.allure  = new AllureRuntime(config)
	}

	suiteStarted(suite) {
		this.group = this.allure.startGroup(suite.name)
	}

	suiteDone() {
		this.group.endGroup()
	}

	get testReporter() {
		return new TestAllureReporter(this.group)
	}
}

module.exports = SuiteAllureReporter