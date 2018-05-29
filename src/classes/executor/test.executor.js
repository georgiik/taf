const isAssertionError = r => (r instanceof Error) && (r.name.includes('AssertionError'))

const safe = tc => async fn => {
	let status, result
	try {
		result = await fn(tc)
		status = 'passed'
	} catch (e) {
		result = e
		if (isAssertionError(result)) {
			status = 'failed'
		} else {
			status = 'broken'
		}
	}
	return { status, result }
}

/** Class implementing Test executor
 * @memberOf Executors
 * */
class TestExecutor {
	/** Executing Test in TestContext.
	 * @param test {TestExecution}
	 * @param testContext {TestContext}
	 * @param threadID {int}
	 * @returns testResult {TestResult} */
	async execute(test, testContext, threadID) {
		const { reporter } = testContext
		const safeExe = safe(testContext)

		reporter.testStarted(test)
		reporter.beforeEachStarted('beforeEach')
		let result = await safeExe(test.beforeEach)
		reporter.beforeEachDone(result)

		if (result.status !== 'passed') {
			reporter.afterEachStarted('afterEach')
			reporter.afterEachDone(await safeExe(test.afterEach))
		} else {
			reporter.testBodyStarted(test)
			reporter.addLabel('thread', threadID)
			test.feature && reporter.addLabel('feature', test.feature)
			test.story && reporter.addLabel('story', test.story)
			test.tags && test.tags.forEach(tag => reporter.addLabel('tag', tag))
			result = await safeExe(test.testBody)
			reporter.testBodyDone(result)

			reporter.afterEachStarted('afterEach')
			reporter.afterEachDone(await safeExe(test.afterEach))
		}

		reporter.testDone(test, result)

		return result
	}
}

module.exports = TestExecutor
