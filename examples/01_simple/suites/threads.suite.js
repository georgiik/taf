const { TestSuite } = require('taf')

class ThreadsSuite extends TestSuite {
	constructor() {
		super('2ThreadsSuite')
		this.threadCount = 2
	}
}

module.exports = ThreadsSuite