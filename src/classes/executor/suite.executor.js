const TestExecutor = require('./test.executor')
/**
 * Class implementing Suite executor
 * @memberOf Executors
 * */
class SuiteExecutor {
	constructor(contextExt, exitCondition, suiteReporter) {
		this.contextExt = contextExt
		this.exitCondition = exitCondition
		this.suiteReporter = suiteReporter
	}
	async executeThread(threadID, threadTests) {
		const threadResults = new Map()
        const testExecutor = new TestExecutor(threadID)
        while (threadTests.length && this.exitCondition.continue()) {
            const test = threadTests.shift()
            const testReporter = this.suiteReporter.testReporter
			const testContext = this.contextExt.extend({testReporter})
			const result = await testExecutor.execute(test, testContext, testReporter)
			this.exitCondition.submitResult(test, result)
			threadResults.set(test, result)
		}
		return threadResults
	}
	async execute(testSuite) {
		const { threadCount } = testSuite
		const running = []
		let suiteResults = new Map()
		let threadID = 0
        this.suiteReporter.suiteStarted(testSuite)
		while (threadID < threadCount) {
			const { threadTests } = testSuite
			const threadDone = this.executeThread(threadID++, threadTests)
			threadDone.then(threadResults => suiteResults = new Map([...suiteResults, ...threadResults]))
			running.push(threadDone)
		}
		await Promise.all(running)
        this.suiteReporter.suiteDone(suiteResults)
		return suiteResults
	}
}

module.exports = SuiteExecutor
