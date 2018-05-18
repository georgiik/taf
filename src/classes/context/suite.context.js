const ThreadContext = require('./thread.context')

class SuiteContext {
	get threadContext() {
		return new ThreadContext()
	}
}

module.exports = SuiteContext