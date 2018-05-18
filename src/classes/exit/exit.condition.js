class ExitCondition {
	constructor(tests) {
		this.tests = tests
	}
	continue() {
		return this.tests.length > 0
	}
	submitResult(test, result) {
	}
}

module.exports = ExitCondition
