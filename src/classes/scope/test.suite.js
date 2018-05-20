const ExitCondition = require('../exit/exit.condition')

class TestSuite {
	constructor(repository, name = 'TestSuite') {
		this.name = name
		this.threadCount = 1
		this.repository = repository
		this.tests = this.query(this.repository.tests)
		this.exitCondition = new ExitCondition(this.tests)
	}
	query(tests) {
		return tests
	}
	get threadTests() {
		return this.tests
	}
}

module.exports = TestSuite