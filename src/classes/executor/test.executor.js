const isError = r => r instanceof Error
const isAssertionError = r => (r instanceof Error) && (r.name.includes('AssertionError'))

const safe = tc => async fn => {
	let status, result
	try {
		result = await fn(tc)
		status = 'passed'
	} catch (e) {
		result = e
		console.log(e)
		if (isAssertionError(result)) {
			status = 'failed'
		} else {
			status = 'broken'
		}
	}
	return { status, result }
}

class TestExecutor {
	constructor(threadID) {
		this.threadID = threadID
	}
	async execute(test, testContext, exitCondition) {
		const { reporter } = testContext
		const safeExe = safe(testContext)

		reporter.suiteStarted(test.suiteName)

		reporter.beforeStarted()
		let result = await safeExe(test.beforeEach)
		reporter.beforeDone(result)

		if (result.status !== 'passed') {
			reporter.afterStarted()
			reporter.afterDone(await safeExe(test.afterEach))
		} else {
			reporter.testStarted(test.testName)
			reporter.addLabel('thread', test.threadID)
			result = await safeExe(test.testBody)
			reporter.testDone(result)

			reporter.afterStarted()
			reporter.afterDone(await safeExe(test.afterEach))
		}

		reporter.suiteDone()

		exitCondition.submitResult(test, result)
	}
}

module.exports = TestExecutor
