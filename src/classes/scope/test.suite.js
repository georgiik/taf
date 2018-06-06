const SuiteContext = require('../context/suite.context')
const ExitCondition = require('../exit/exit.condition')

/** Class implementing Test suite
 * @memberOf Scope
 * */
class TestSuite {
	constructor(config, repository) {
		Object.assign(this, config)
		this.name = config.name || this.constructor.name
        this.exitCondition = new ExitCondition(this._tests)
        this.tests = config.query(repository.tests)
	}
	set tests(value) {
		this._tests = value
		this.exitCondition.tests = value
	}
	get tests() {
		return this._tests
	}
	get threadTests() {
		return this.tests
	}
}

module.exports = TestSuite
