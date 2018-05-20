const Loader = require('../di/loader')

class Executor {
	constructor() {
		this.loader = new Loader()
		this.loader.loadDir(__dirname)
	}
	getClass(clsName) {
		return this.loader.getClass(clsName)
	}
	load(loadFn) {
		loadFn(this.loader)
		return this
	}
	configure(config) {
		const Repository = this.getClass('Repository')
		const SuiteReporter = this.getClass('SuiteReporter')
		this.repository = new Repository(config.tests)
		this.suiteReporter = new SuiteReporter()

		config.onConfigure && config.onConfigure()

		return this
	}
	async execute(TestSuite, SuiteContext) {
		const testSuite = new TestSuite(this.repository)
		const suiteContext = new SuiteContext(this.suiteReporter)
		return this.executeInstances(testSuite, suiteContext)
	}
	async executeInstances(testSuite, suiteContext) {
		const SuiteExecutor = this.getClass('SuiteExecutor')
		const suiteExecutor = new SuiteExecutor()
		return suiteExecutor.execute(testSuite, suiteContext)
	}
}

module.exports = Executor