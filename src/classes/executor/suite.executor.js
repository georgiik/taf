const TestExecutor = require('./test.executor')

class SuiteExecutor {
	constructor() {
		this.suiteResults = new Map()
	}
	async executeThread(threadID, threadTests, suiteContext, exitCondition) {
		while (threadTests.length && exitCondition.continue()) {
			const test = threadTests.shift()
			const testContext = suiteContext.testContext
			const testExecutor = new TestExecutor(threadID)
			const result = await testExecutor.execute(test, testContext)
			exitCondition.submitResult(test, result)
			this.suiteResults.set(test, result)
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
		suiteReporter.suiteDone(this.suiteResults)
	}
}

module.exports = SuiteExecutor
