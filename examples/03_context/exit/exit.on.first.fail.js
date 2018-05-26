const { ExitCondition } = require('taf')

class ExitOnFirstFail extends ExitCondition {
	constructor(tests) {
		super(tests)
		this.failed = 0
	}
	continue() {
		return this.failed === 0
	}
	submitResult(test, result) {
		if (result.status === 'failed') {
			this.failed++
		}
	}
}

module.exports = ExitOnFirstFail