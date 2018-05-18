const ThreadExecutor = require('./thread.executor')

class SuiteExecutor {
	constructor() {
		this.threadID = 0
	}
	get threadExecutor() {
		return new ThreadExecutor(this.threadID++)
	}
	async execute(testSuite, suiteContext) {
		const running = []
		let threads = testSuite.threadCount
		while (threads--) {
			const { threadTests, exitCondition } = testSuite
			const threadContext = suiteContext.threadContext
			const threadDone = this.threadExecutor.execute(threadTests, threadContext, exitCondition)
			running.push(threadDone)
		}
		await Promise.all(running)
	}
}

module.exports = SuiteExecutor
