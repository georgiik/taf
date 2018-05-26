const TestExecutor = require('./test.executor')
const SuiteConsoleReporter = require('../report/suite.console.reporter')

/**
 * Class implementing Suite executor
 * */
class SuiteExecutor {
	/** Executing tests in async thread. Test execution is done until there are tests or Exit Condition fulfilled
	 * @param threadID {int}
	 * @param threadTests {TestExecution[]}
	 * @param suiteContext {SuiteContext}
	 * @param exitCondition {ExitCondition}
	 * @return threadResults {Promise<Map<{Test}, {TestResult}>>}
	 * */
	async executeThread(threadID, threadTests, suiteContext, exitCondition) {
		const threadResults = new Map()
		while (threadTests.length && exitCondition.continue()) {
			const test = threadTests.shift()
			const testContext = suiteContext.testContext
			const testExecutor = new TestExecutor(threadID)
			const result = await testExecutor.execute(test, testContext, threadID)
			exitCondition.submitResult(test, result)
			threadResults.set(test, result)
		}
		return threadResults
	}
	/** Executing Test Suite
	 * @param {TestSuite.instance}
	 * @return {Promise<Map<{Test}, {TestResult}>>}
	 * */
	async execute(testSuite) {
		const { threadCount, exitCondition, suiteContext } = testSuite
		const { suiteReporter } = suiteContext
		const running = []
		let suiteResults = new Map()
		let threadID = 0
		if (suiteReporter.reporters.length === 0) {
			suiteReporter.addReporter(new SuiteConsoleReporter())
		}
		suiteReporter.suiteStarted(testSuite)
		while (threadID < threadCount) {
			const { threadTests } = testSuite
			const threadDone = this.executeThread(threadID++, threadTests, suiteContext, exitCondition)
			threadDone.then(threadResults => suiteResults = new Map([...suiteResults, ...threadResults]))
			running.push(threadDone)
		}
		await Promise.all(running)
		suiteReporter.suiteDone(suiteResults)
		return suiteResults
	}
}

module.exports = SuiteExecutor
