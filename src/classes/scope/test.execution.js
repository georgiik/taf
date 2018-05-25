const emptyFn = () => {}

class TestExecution {
	constructor(props, testInstance) {
		this.testInstance = testInstance || null
		props && Object.assign(this, props)
	}
	beforeEachTest(fn = emptyFn) {
		this.beforeEach = (...args) => fn.apply(this.testInstance, args)
	}
	test(fn) {
		this.testBody = (...args) => fn.apply(this.testInstance, args)
	}
	afterEachTest(fn = emptyFn) {
		this.afterEach = (...args) => fn.apply(this.testInstance, args)
	}
}

module.exports = TestExecution