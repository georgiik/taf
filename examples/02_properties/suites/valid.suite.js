const { TestSuite } = require('taf')

class ValidSuite extends TestSuite {
	query(tests) {
		this.tests = tests.filter(test => test.tags.includes('Valid'))
	}
}

module.exports = ValidSuite