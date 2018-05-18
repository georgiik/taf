const TestContext = require('./test.context')

class ThreadContext {
	get testContext() {
		return new TestContext()
	}
}

module.exports = ThreadContext