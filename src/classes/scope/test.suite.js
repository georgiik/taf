const ExitCondition = require('../exit/exit.condition')

class TestSuite {
	constructor(repository, name = 'TestSuite') {
		this.name = name
		this.threadCount = 1
		this.repository = repository
		this.threadID = 0
		this.tests = this.assignThread(this.assignSuite(this.query(this.repository.tests)))
		this.exitCondition = new ExitCondition(this.tests)
	}
	assignSuite(tests) {
		const ts = tests.slice(0)
	    ts.forEach(t => {
			t.suiteName = this.name
		})
		return ts
	}
	assignThread(tests) {
		tests.forEach(t => {
			t.threadID = this.threadID++
			return t
		})
		return tests
	}
	query(tests) {
		return tests
	}
	get threadTests() {
		return this.tests
	}
}

module.exports = TestSuite