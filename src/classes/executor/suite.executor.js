const TestExecutor = require('./test.executor')

class SuiteExecutor {
	constructor(testSuite) {
		this.testSuite = testSuite
		this.exitCondition = testSuite.exitCondition
		this.suiteContext = testSuite.suiteContext
		this.suiteReporter = this.suiteContext.suiteReporter
		this.suiteResults = new Map()
	}
	async executeThread(threadID, threadTests) {
		while (threadTests.length && this.exitCondition.continue()) {
			const test = threadTests.shift()
			const testContext = this.suiteContext.testContext
			const testExecutor = new TestExecutor(threadID)
			const result = await testExecutor.execute(test, testContext)
			this.exitCondition.submitResult(test, result)
			this.suiteResults.set(test, result)
		}
	}
	async execute() {
		const running = []
		let threadID = 0
		this.suiteReporter.suiteStarted(this.testSuite)
		while (threadID < this.testSuite.threadCount) {
			const threadDone = this.executeThread(threadID++, this.testSuite.threadTests)
			running.push(threadDone)
		}
		await Promise.all(running)
		this.suiteReporter.suiteDone(this.suiteResults)
		return this.suiteResults
	}
}

module.exports = SuiteExecutor
