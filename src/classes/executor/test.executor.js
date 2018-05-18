const isError = r => r instanceof Error
const isAssertionError = r => (r instanceof Error) && (r.name.includes('AssertionError'))
const safe = tc => async fn => {
	try {
		return await fn(tc)
	} catch (e) {
		return e
	}
}

class TestExecutor {
	constructor(threadID) {
		this.threadID = threadID
	}
	async execute(test, testContext, exitCondition) {
		const { reporter } = testContext
		const safeExe = safe(testContext)

		reporter.suiteStarted(test.suiteName)
		reporter.testStarted(test.testName)
		let result

		const resultBeforeEach = await safeExe(test.beforeEach)
		if (isError(resultBeforeEach)) {
			reporter.testDone({status: 'pending', pendingReason: 'beforeEach Failed'})
			reporter.testStarted(`beforeEach(${test.testName})`)
			reporter.addLabel('thread', this.threadID)
			reporter.testDone({status: 'broken', result: resultBeforeEach})
			const resultAfterEach = await safeExe(test.afterEach)
			if (isError(resultAfterEach)) {
				reporter.testStarted(`afterEach(${test.testName})`)
				reporter.addLabel('thread', this.threadID)
				reporter.testDone({status: 'broken', result: resultAfterEach})
			}
		} else {
			const resultTest = await safeExe(test.testBody)
			if (isAssertionError(resultTest)) {
				result = { status: 'failed', result: resultTest }
				reporter.testDone(result)
			} else if (isError(resultTest)) {
				result = { status: 'broken', result: resultTest }
				reporter.testDone(result)
			} else {
				result = { status: 'passed' }
				reporter.testDone(result)
			}
			const resultAfterEach = await safeExe(test.afterEach)
			if (isError(resultAfterEach)) {
				reporter.testStarted(`afterEach(${test.testName})`)
				reporter.addLabel('thread', this.threadID)
				reporter.testDone({status: 'broken', result: resultAfterEach})
			}
		}

		reporter.suiteDone()

		exitCondition.submitResult(test, result)
	}
}

module.exports = TestExecutor
