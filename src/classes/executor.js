const Loader = require('../di/loader')

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
	async execute(TestSuite = this.getClass('TestSuite')) {
		const testSuite = new TestSuite()
		testSuite.query(this.repository.tests)
		return this.executeInstances(testSuite)
	}
	async executeInstances(testSuite) {
		const SuiteExecutor = this.getClass('SuiteExecutor')
		const suiteExecutor = new SuiteExecutor(testSuite)
		return suiteExecutor.execute()
	}
}

module.exports = Executor