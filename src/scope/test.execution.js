const emptyFn = () => {}

/** Class implementing Test execution
 * @memberOf Scope
 * */
class TestExecution {
	constructor(props = {}) {
		Object.assign(this, props)
	}
	beforeEachTest(fn = emptyFn) {
		this.beforeEach = (context) => fn(context)
	}
	test(fn) {
		this.testBody = (context) => fn(context)
	}
	afterEachTest(fn = emptyFn) {
		this.afterEach = (context) => fn(context)
	}
}

module.exports = TestExecution
