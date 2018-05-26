const { TestSuite } = require('taf')
const UiSuiteContext = require('../context/ui.suite.context')

class WrestlerSuite extends TestSuite {
	constructor() {
		super('WrestlerSuite')
		this.threadCount = 3
		this.suiteContext = new UiSuiteContext()
	}
	query(tests) {
		this.tests = tests.filter(t => t.tags.includes('wrestler'))
	}
}

module.exports = WrestlerSuite