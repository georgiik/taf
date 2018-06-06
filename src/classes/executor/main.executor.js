const TestRepository = require('../scope/test.repository')
const TestSuite = require('../scope/test.suite')
const SuiteContext = require('../context/suite.context')
const SuiteExecutor = require('./suite.executor')
const ExitCondition = require('../exit/exit.condition')
const SuiteReporter = require('../report/suite.reporter')
const SuiteConsoleReporter = require('../report/suite.console.reporter')
const ContextExtension = require('../context/context.extension')
const defaultSuiteConfig = require('../config/suite.default.config')

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
		return this
	}
	async execute(suiteConfig) {
		const config = Object.assign({}, defaultSuiteConfig, suiteConfig)
		const testSuite = new TestSuite(config, this.repository)
		const contextExt = new ContextExtension()
		const exitCondition = new ExitCondition()
		const suiteReporter = new SuiteReporter()
        suiteReporter.addReporter(new SuiteConsoleReporter())
        return this.executeInstance(testSuite, contextExt, exitCondition, suiteReporter)
	}
	async executeInstance(testSuite, contextExt, exitCondition, suiteReporter) {
        const suiteExecutor = new SuiteExecutor(contextExt, exitCondition, suiteReporter)
		return suiteExecutor.execute(testSuite)
	}
}

module.exports = MainExecutor
