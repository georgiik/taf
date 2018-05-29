const { TestSuite } = require('taf')
const UiSuiteContext = require('../context/ui.suite.context')

class AllSuite extends TestSuite {
	constructor() {
		super('AllTestsSuite')
		this.threadCount = 3
		this.suiteContext = new UiSuiteContext()
	}
}

module.exports = AllSuite