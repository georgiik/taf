const { TestSuite } = require('taf')
const UiSuiteContext = require('../context/ui.suite.context')

class LoginSuite extends TestSuite {
	constructor() {
		super('LoginSuite')
		this.threadCount = 2
		this.suiteContext = new UiSuiteContext()
	}
	query(tests) {
		this.tests = tests.filter(t => t.tags.includes('login'))
	}
}

module.exports = LoginSuite
