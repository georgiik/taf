const TestExecutor = require('./test.executor')

class SuiteExecutor {
	async executeThread(threadID, threadTests, suiteContext, exitCondition) {
		while (exitCondition.continue() && threadTests.length) {
			const test = threadTests.shift()
			const testContext = suiteContext.testContext
			const testExecutor = new TestExecutor(threadID)
			await testExecutor.execute(test, testContext, exitCondition)
		}
	}
	async execute(testSuite, suiteContext) {
		const { suiteReporter } = suiteContext
		suiteReporter.suiteStarted(testSuite)
		const running = []
		let threads = testSuite.threadCount
		let threadID = 0
		while (threads--) {
			const { threadTests, exitCondition } = testSuite
			const threadDone = this.executeThread(threadID++, threadTests, suiteContext, exitCondition)
			running.push(threadDone)
		}
		await Promise.all(running)
		suiteReporter.suiteDone()
	}
}

module.exports = SuiteExecutor
