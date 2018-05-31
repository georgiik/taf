const TestRepository = require('../scope/test.repository')
const TestSuite = require('../scope/test.suite')
const SuiteExecutor = require('./suite.executor')

/** @namespace Executors */

/**
 * Class implementing main executor for Test Runner
 * @memberOf Executors
 * */
class MainExecutor {
	constructor() {
		this.repository = new TestRepository()
        this.suiteExecutor = new SuiteExecutor()
    }
	configure(config) {
		this.repository.loadTests(config.tests)
		config.onConfigure && config.onConfigure(this)
		return this
	}
	/**
	 * Executing a test suite
	 * @param {TestSuite.class} TestSuiteClass [TestSuite=TestSuite.class] - Test Suite to execute, default is TestSuite.class
	 * @return {Promise<Map<{Test}, {TestResult}>>}
	 * */
	async execute(TestSuiteClass = TestSuite) {
		const testSuite = new TestSuiteClass()
		testSuite.query(this.repository.tests)
		return this.executeInstance(testSuite)
	}
	/**
	 * Executing a test suite
	 * @param {TestSuite.instance} testSuite
	 * @return {Promise<Map<{Test}, {TestResult}>>}
	 * */
	async executeInstance(testSuite) {
		return this.suiteExecutor.execute(testSuite)
	}
}

module.exports = MainExecutor
