const Loader = require('../di/loader')

/**
 * Class implementing main executor for Test Runner
 * */
class Executor {
	constructor() {
		this.loader = new Loader()
		this.loader.loadDir(__dirname)
		const TestRepository = this.getClass('TestRepository')
		this.repository = new TestRepository()
	}
	getClass(clsName) {
		return this.loader.getClass(clsName)
	}
	configure(config) {
		this.repository.loadTests(config.tests)
		config.onConfigure && config.onConfigure(this)
		return this
	}
	/**
	 * Executing a test suite
	 * @param TestSuite {TestSuite.class} [TestSuite=TestSuite.class] - Test Suite to execute, default is TestSuite.class
	 * @return {Promise<Map<{Test}, {TestResult}>>}
	 * */
	async execute(TestSuite = this.getClass('TestSuite')) {
		const testSuite = new TestSuite()
		testSuite.query(this.repository.tests)
		return this.executeInstance(testSuite)
	}
	/**
	 * Executing a test suite
	 * @param {TestSuite.instance}
	 * @return {Promise<Map<{Test}, {TestResult}>>}
	 * */
	async executeInstance(testSuite) {
		const SuiteExecutor = this.getClass('SuiteExecutor')
		const suiteExecutor = new SuiteExecutor()
		return suiteExecutor.execute(testSuite)
	}
}

module.exports = Executor