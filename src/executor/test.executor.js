const isAssertionError = r => (r instanceof Error) && (r.name.includes('AssertionError'))

function cutStack(error) {
	const stack = error.stack.split('\n')
    let index
    for (let i = 0; i < stack.length; i++) {
        if (stack[i].includes('testBody')) {
            index = i
            break
        }
    }
    error.stack = stack.slice(0, index).join('\n')
	return error
}

const safe = tc => async fn => {
	let status, result
	try {
		result = await fn(tc)
		status = 'passed'
	} catch (e) {
		result = cutStack(e)
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
	constructor(threadID) {
		this.threadID = threadID
	}
	async execute(test, testContext, testReporter) {
		const safeExe = safe(testContext)

		testReporter.testStarted(test)
		testReporter.beforeEachStarted('beforeEach')
		let result = await safeExe(test.beforeEach)
		testReporter.beforeEachDone(result)

		if (result.status === 'passed') {
			testReporter.testBodyStarted(test)
			testReporter.addLabel('thread', this.threadID)
			result = await safeExe(test.testBody)
			testReporter.testBodyDone(result)
		}

        testReporter.afterEachStarted('afterEach')
        testReporter.afterEachDone(await safeExe(test.afterEach))

		testReporter.testDone(test, result)

		return result
	}
}

module.exports = TestExecutor
