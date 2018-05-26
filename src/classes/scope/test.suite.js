const SuiteContext = require('../context/suite.context')
const ExitCondition = require('../exit/exit.condition')

class TestSuite {
	constructor(name) {
		this.name = name || this.constructor.name
		this.threadCount = 1
		this.suiteContext = new SuiteContext()
		this._tests = []
		this.exitCondition = new ExitCondition(this._tests)
	}
	set tests(value) {
		this._tests = value
		this.exitCondition.tests = value
	}
	get tests() {
		return this._tests
	}
	query(tests) {
		this.tests = tests
	}
	get threadTests() {
		return this.tests
	}
}

module.exports = TestSuite