const TestRepository = require('../scope/test.repository')
const TestSuite = require('../scope/test.suite')
const SuiteExecutor = require('./suite.executor')
const ExitCondition = require('../exit.condition')
const SuiteReporter = require('../report/suite.reporter')
const SuiteConsoleReporter = require('../report/suite.console.reporter')
const DefaultContext = require('../default.context')
const defaultSuiteConfig = require('../suite.default.config')

/** @namespace Executors */

/**
 * Class implementing main executor for Test Runner
 * @memberOf Executors
 * */
class MainExecutor {
	constructor() {
		this.repository = new TestRepository()
    }
	configure(config) {
		this.repository.loadTests(config.tests)
		config.onConfigure && config.onConfigure(this)
		this.testContext = config.context ? new config.context() : new DefaultContext()
		return this
	}
	async execute(suiteConfig) {
		const config = Object.assign({}, defaultSuiteConfig, suiteConfig)
		const testSuite = new TestSuite(config, this.repository)
		const exitCondition = new ExitCondition()
		const suiteReporter = new SuiteReporter()
        suiteReporter.addReporter(new SuiteConsoleReporter())
        return this.executeInstance(testSuite, this.testContext, exitCondition, suiteReporter)
	}
	async executeInstance(testSuite, testContext, exitCondition, suiteReporter) {
        const suiteExecutor = new SuiteExecutor(testContext, exitCondition, suiteReporter)
		return suiteExecutor.execute(testSuite)
	}
}

module.exports = MainExecutor
