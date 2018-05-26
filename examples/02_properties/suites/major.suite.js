const { TestSuite } = require('taf')

class MajorSuite extends TestSuite {
	constructor() {
		super('MajorSuite')
	}
	query(tests) {
		this.tests = tests.filter(test => test.severity === 'Major')
	}
}

module.exports = MajorSuite