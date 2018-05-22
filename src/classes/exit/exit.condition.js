class ExitCondition {
	constructor(tests) {
		this.tests = tests
	}
	continue() {
		return true
	}
	submitResult(test, result) {

	}
}

module.exports = ExitCondition
