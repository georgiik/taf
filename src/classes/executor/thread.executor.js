const TestExecutor = require('./test.executor')

class ThreadExecutor {
	constructor(threadID) {
		this.threadID = threadID
	}
	get testExecutor() {
		return new TestExecutor(this.threadID)
	}
	async execute(threadTests, threadContext, exitCondition) {
		while (exitCondition.continue()) {
			const test = threadTests.shift()
			const testContext = threadContext.testContext
			await this.testExecutor.execute(test, testContext, exitCondition)
		}
	}
}

module.exports = ThreadExecutor